const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getCourts() {
  const res = await fetch(`${API_URL}/courts`, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudieron cargar las canchas");
  return res.json();
}

export async function startMatch(data: {
  courtId: number;
  teamAName: string;
  teamBName: string;
  goldenPoint?: boolean;
  bestOfSets?: number;
}) {
  const res = await fetch(`${API_URL}/matches/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("No se pudo iniciar el partido");
  return res.json();
}

export async function addPoint(matchId: string, team: "A" | "B") {
  const res = await fetch(`${API_URL}/matches/${matchId}/point`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ team })
  });

  if (!res.ok) throw new Error("No se pudo sumar el punto");
  return res.json();
}

export async function finishMatch(matchId: string) {
  const res = await fetch(`${API_URL}/matches/${matchId}/finish`, {
    method: "POST"
  });

  if (!res.ok) throw new Error("No se pudo finalizar el partido");
  return res.json();
}
