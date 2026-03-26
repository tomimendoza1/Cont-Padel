import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import { prisma } from "@padel/db";
import { applyPoint } from "./services/scoring.service.js";
import { presentMatch } from "./utils/presenters.js";

const app = express();
const server = http.createServer(app);

const origins = process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"];

const io = new Server(server, {
  cors: {
    origin: origins,
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: origins }));
app.use(express.json());

io.on("connection", (socket) => {
  socket.on("join:court", (courtId: number) => {
    socket.join(`court:${courtId}`);
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/courts", async (_req, res) => {
  const courts = await prisma.court.findMany({
    include: {
      matches: {
        where: { status: "LIVE" },
        orderBy: { startedAt: "desc" },
        take: 1
      }
    },
    orderBy: { id: "asc" }
  });

  res.json(
    courts.map((court) => ({
      id: court.id,
      name: court.name,
      slug: court.slug,
      status: court.status,
      liveMatch: court.matches[0] ? presentMatch(court.matches[0]) : null
    }))
  );
});

app.post("/matches/start", async (req, res) => {
  const { courtId, teamAName, teamBName, goldenPoint = true, bestOfSets = 3 } =
    req.body;

  await prisma.match.updateMany({
    where: { courtId, status: "LIVE" },
    data: { status: "FINISHED", endedAt: new Date() }
  });

  await prisma.court.update({
    where: { id: courtId },
    data: { status: "LIVE" }
  });

  const match = await prisma.match.create({
    data: {
      courtId,
      teamAName,
      teamBName,
      goldenPoint,
      bestOfSets,
      events: {
        create: { type: "START", payload: req.body }
      }
    }
  });

  const payload = presentMatch(match);
  io.to(`court:${courtId}`).emit("score:update", payload);

  res.json(payload);
});

app.post("/matches/:id/point", async (req, res) => {
  const { id } = req.params;
  const { team } = req.body;

  const match = await prisma.match.findUnique({
    where: { id }
  });

  if (!match || match.status !== "LIVE") {
    return res.status(404).json({ error: "Partido no encontrado o no activo" });
  }

  const next = applyPoint(
    {
      pointIndexA: match.pointIndexA,
      pointIndexB: match.pointIndexB,
      advantageTeam: match.advantageTeam,
      gamesA: match.gamesA,
      gamesB: match.gamesB,
      setsA: match.setsA,
      setsB: match.setsB,
      tieBreak: match.tieBreak,
      goldenPoint: match.goldenPoint,
      bestOfSets: match.bestOfSets
    },
    team
  );

  const updated = await prisma.match.update({
    where: { id },
    data: {
      pointIndexA: next.pointIndexA,
      pointIndexB: next.pointIndexB,
      advantageTeam: next.advantageTeam,
      gamesA: next.gamesA,
      gamesB: next.gamesB,
      setsA: next.setsA,
      setsB: next.setsB,
      tieBreak: next.tieBreak,
      events: {
        create: {
          type: team === "A" ? "POINT_A" : "POINT_B",
          payload: { team }
        }
      }
    }
  });

  const payload = presentMatch(updated);
  io.to(`court:${updated.courtId}`).emit("score:update", payload);

  res.json(payload);
});

app.post("/matches/:id/finish", async (req, res) => {
  const { id } = req.params;

  const updated = await prisma.match.update({
    where: { id },
    data: {
      status: "FINISHED",
      endedAt: new Date(),
      events: {
        create: { type: "FINISH" }
      }
    }
  });

  await prisma.court.update({
    where: { id: updated.courtId },
    data: { status: "IDLE" }
  });

  const payload = presentMatch(updated);
  io.to(`court:${updated.courtId}`).emit("score:update", payload);

  res.json(payload);
});

const PORT = Number(process.env.PORT ?? 4000);

server.listen(PORT, () => {
  console.log(`API realtime corriendo en http://localhost:${PORT}`);
});
