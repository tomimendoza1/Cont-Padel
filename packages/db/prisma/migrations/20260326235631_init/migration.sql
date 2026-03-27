-- CreateEnum
CREATE TYPE "CourtStatus" AS ENUM ('IDLE', 'LIVE', 'PAUSED');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('LIVE', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('START', 'POINT_A', 'POINT_B', 'UNDO', 'RESET', 'FINISH');

-- CreateTable
CREATE TABLE "Court" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "CourtStatus" NOT NULL DEFAULT 'IDLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "courtId" INTEGER NOT NULL,
    "teamAName" TEXT NOT NULL,
    "teamBName" TEXT NOT NULL,
    "pointIndexA" INTEGER NOT NULL DEFAULT 0,
    "pointIndexB" INTEGER NOT NULL DEFAULT 0,
    "advantageTeam" TEXT,
    "gamesA" INTEGER NOT NULL DEFAULT 0,
    "gamesB" INTEGER NOT NULL DEFAULT 0,
    "setsA" INTEGER NOT NULL DEFAULT 0,
    "setsB" INTEGER NOT NULL DEFAULT 0,
    "tieBreak" BOOLEAN NOT NULL DEFAULT false,
    "goldenPoint" BOOLEAN NOT NULL DEFAULT true,
    "bestOfSets" INTEGER NOT NULL DEFAULT 3,
    "status" "MatchStatus" NOT NULL DEFAULT 'LIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchEvent" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Court_slug_key" ON "Court"("slug");

-- CreateIndex
CREATE INDEX "Match_courtId_status_idx" ON "Match"("courtId", "status");

-- CreateIndex
CREATE INDEX "MatchEvent_matchId_createdAt_idx" ON "MatchEvent"("matchId", "createdAt");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchEvent" ADD CONSTRAINT "MatchEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
