import { getDisplayPoints } from "../services/scoring.service.js";

export function presentMatch(match: any) {
  const display = getDisplayPoints(match);

  return {
    id: match.id,
    courtId: match.courtId,
    teamAName: match.teamAName,
    teamBName: match.teamBName,
    gamesA: match.gamesA,
    gamesB: match.gamesB,
    setsA: match.setsA,
    setsB: match.setsB,
    tieBreak: match.tieBreak,
    goldenPoint: match.goldenPoint,
    status: match.status,
    pointA: display.a,
    pointB: display.b,
    advantageTeam: display.advantageTeam
  };
}
