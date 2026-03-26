type ScoreboardProps = {
  teamAName: string;
  teamBName: string;
  pointA: number | string;
  pointB: number | string;
  gamesA: number;
  gamesB: number;
  setsA: number;
  setsB: number;
  advantageTeam?: string | null;
};

export function Scoreboard({
  teamAName,
  teamBName,
  pointA,
  pointB,
  gamesA,
  gamesB,
  setsA,
  setsB,
  advantageTeam
}: ScoreboardProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: 48, marginBottom: 12 }}>
        {teamAName} vs {teamBName}
      </h1>

      <div style={{ fontSize: 96, fontWeight: 700 }}>
        {pointA} - {pointB}
      </div>

      <div style={{ fontSize: 36, marginTop: 16 }}>
        Games: {gamesA} - {gamesB}
      </div>

      <div style={{ fontSize: 36 }}>
        Sets: {setsA} - {setsB}
      </div>

      {advantageTeam && (
        <div style={{ marginTop: 16, fontSize: 28 }}>
          Ventaja: Equipo {advantageTeam}
        </div>
      )}
    </div>
  );
}
