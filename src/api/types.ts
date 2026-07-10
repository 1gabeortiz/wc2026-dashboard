export type MatchStatus =
    | 'SCHEDULED'
    | 'TIMED'
    | 'IN_PLAY'
    | 'PAUSED'
    | 'FINISHED'
    | 'POSTPONED'
    | 'SUSPENDED'
    | 'CANCELLED';
  export type MatchStage =
    | 'GROUP_STAGE'
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'THIRD_PLACE'
    | 'FINAL';
  export interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  }
  export interface Score {
    home: number | null;
    away: number | null;
  }
  export interface MatchScore {
    winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
    duration: 'REGULAR' | 'EXTRA_TIME' | 'PENALTY_SHOOTOUT';
    fullTime: Score;
    halfTime: Score;
    extraTime?: Score;
    penalties?: Score;
  }
  export interface Match {
    id: number;
    utcDate: string;
    status: MatchStatus;
    stage: MatchStage;
    group: string | null;
    matchday: number | null;
    homeTeam: Team;
    awayTeam: Team;
    score: MatchScore;
  }
  export interface StandingEntry {
    position: number;
    team: Team;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
  }
  export interface Group {
    stage: string;
    type: string;
    group: string;
    table: StandingEntry[];
  }
  export interface StandingsResponse {
    competition: { id: number; name: string; code: string };
    standings: Group[];
  }
  export interface MatchesResponse {
    competition: { id: number; name: string; code: string };
    matches: Match[];
  }
  export interface Scorer {
    player: {
      id: number;
      name: string;
      nationality: string | null;
    };
    team: Team;
    goals: number;
    assists: number | null;
    penalties: number | null;
  }
  export interface ScorersResponse {
    competition: { id: number; name: string; code: string };
    scorers: Scorer[];
  }