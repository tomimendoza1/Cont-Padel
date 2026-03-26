export type Team = "A" | "B";

type MatchState = {
  pointIndexA: number;
  pointIndexB: number;
  advantageTeam: string | null;
  gamesA: number;
  gamesB: number;
  setsA: number;
  setsB: number;
  tieBreak: boolean;
  goldenPoint: boolean;
  bestOfSets: number;
};

const TENNIS_POINTS = [0, 15, 30, 40];

function resetPoints(state: MatchState) {
  state.pointIndexA = 0;
  state.pointIndexB = 0;
  state.advantageTeam = null;
  state.tieBreak = false;
}

function winSetIfNeeded(state: MatchState) {
  const aCanWin = state.gamesA >= 6 && state.gamesA - state.gamesB >= 2;
  const bCanWin = state.gamesB >= 6 && state.gamesB - state.gamesA >= 2;

  if (aCanWin) {
    state.setsA += 1;
    state.gamesA = 0;
    state.gamesB = 0;
    resetPoints(state);
  }

  if (bCanWin) {
    state.setsB += 1;
    state.gamesA = 0;
    state.gamesB = 0;
    resetPoints(state);
  }

  if (state.gamesA === 6 && state.gamesB === 6) {
    state.tieBreak = true;
  }
}

function winGame(state: MatchState, team: Team) {
  if (team === "A") state.gamesA += 1;
  if (team === "B") state.gamesB += 1;

  state.pointIndexA = 0;
  state.pointIndexB = 0;
  state.advantageTeam = null;

  winSetIfNeeded(state);
}

export function applyPoint(state: MatchState, team: Team) {
  if (state.tieBreak) {
    if (team === "A") state.pointIndexA += 1;
    if (team === "B") state.pointIndexB += 1;

    const aWinsTb =
      state.pointIndexA >= 7 && state.pointIndexA - state.pointIndexB >= 2;
    const bWinsTb =
      state.pointIndexB >= 7 && state.pointIndexB - state.pointIndexA >= 2;

    if (aWinsTb) {
      state.gamesA += 1;
      state.setsA += 1;
      state.gamesA = 0;
      state.gamesB = 0;
      resetPoints(state);
    }

    if (bWinsTb) {
      state.gamesB += 1;
      state.setsB += 1;
      state.gamesA = 0;
      state.gamesB = 0;
      resetPoints(state);
    }

    return state;
  }

  const myPoint = team === "A" ? state.pointIndexA : state.pointIndexB;
  const rivalPoint = team === "A" ? state.pointIndexB : state.pointIndexA;

  if (myPoint >= 3 && rivalPoint < 3) {
    winGame(state, team);
    return state;
  }

  if (myPoint < 3) {
    if (team === "A") state.pointIndexA += 1;
    if (team === "B") state.pointIndexB += 1;
    return state;
  }

  if (state.goldenPoint && state.pointIndexA >= 3 && state.pointIndexB >= 3) {
    winGame(state, team);
    return state;
  }

  if (state.pointIndexA >= 3 && state.pointIndexB >= 3) {
    if (state.advantageTeam === team) {
      winGame(state, team);
      return state;
    }

    if (state.advantageTeam && state.advantageTeam !== team) {
      state.advantageTeam = null;
      return state;
    }

    state.advantageTeam = team;
    return state;
  }

  if (team === "A") state.pointIndexA += 1;
  if (team === "B") state.pointIndexB += 1;

  return state;
}

export function getDisplayPoints(state: MatchState) {
  if (state.tieBreak) {
    return {
      a: state.pointIndexA,
      b: state.pointIndexB,
      advantageTeam: null
    };
  }

  return {
    a: TENNIS_POINTS[Math.min(state.pointIndexA, 3)],
    b: TENNIS_POINTS[Math.min(state.pointIndexB, 3)],
    advantageTeam: state.advantageTeam
  };
}
