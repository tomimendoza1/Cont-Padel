"use client";

import { useEffect, useState } from "react";
import { addPoint, finishMatch, getCourts, startMatch } from "../../lib/api";
import { CourtCard } from "../../components/CourtCard";

type Court = {
  id: number;
  name: string;
  slug: string;
  status: string;
  liveMatch: any | null;
};

export default function AdminPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await getCourts();
      setCourts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Panel administrador</h1>
      <p>Control rápido de canchas y partidos en vivo.</p>

      {loading && <p>Cargando canchas...</p>}

      <div style={{ display: "grid", gap: 16 }}>
        {courts.map((court) => (
          <CourtCard
            key={court.id}
            name={court.name}
            status={court.status}
            teamA={court.liveMatch?.teamAName}
            teamB={court.liveMatch?.teamBName}
            onStart={async () => {
              await startMatch({
                courtId: court.id,
                teamAName: "Pareja A",
                teamBName: "Pareja B",
                goldenPoint: true,
                bestOfSets: 3
              });
              await load();
            }}
            onPointA={async () => {
              if (!court.liveMatch?.id) return;
              await addPoint(court.liveMatch.id, "A");
              await load();
            }}
            onPointB={async () => {
              if (!court.liveMatch?.id) return;
              await addPoint(court.liveMatch.id, "B");
              await load();
            }}
            onFinish={async () => {
              if (!court.liveMatch?.id) return;
              await finishMatch(court.liveMatch.id);
              await load();
            }}
          />
        ))}
      </div>
    </main>
  );
}
