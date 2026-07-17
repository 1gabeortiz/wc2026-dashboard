import { render, screen } from '@testing-library/react';
  import { describe, expect, it, vi } from 'vitest';
  import MatchCard from './MatchCard';
  import type { Match } from '../../api/types';
  vi.mock('../../utils/dateUtils', () => ({
    formatLocalKickoff: () => 'Mock kickoff time',
  }));
  const baseMatch: Match = {
    id: 99,
    utcDate: '2026-07-01T18:00:00Z',
    status: 'TIMED',
    stage: 'GROUP_STAGE',
    group: 'GROUP_A',
    matchday: 1,
    homeTeam: {
      id: 1,
      name: 'Brazil',
      shortName: 'Brazil',
      tla: 'BRA',
      crest: 'https://example.com/bra.png',
    },
    awayTeam: {
      id: 2,
      name: 'Spain',
      shortName: 'Spain',
      tla: 'ESP',
      crest: 'https://example.com/esp.png',
    },
    score: {
      winner: null,
      duration: 'REGULAR',
      fullTime: { home: null, away: null },
      halfTime: { home: null, away: null },
    },
  };
  describe('MatchCard', () => {
    it('renders team names and kickoff time', () => {
      render(<MatchCard match={baseMatch} />);
      expect(screen.getByText('Brazil')).toBeInTheDocument();
      expect(screen.getByText('Spain')).toBeInTheDocument();
      expect(screen.getByText('Mock kickoff time')).toBeInTheDocument();
    });
    it('shows LIVE label for live matches', () => {
      render(<MatchCard match={{ ...baseMatch, status: 'IN_PLAY' }} />);
      expect(screen.getByText('LIVE')).toBeInTheDocument();
    });
    it('shows full-time score when available', () => {
      render(
        <MatchCard
          match={{
            ...baseMatch,
            status: 'FINISHED',
            score: {
              ...baseMatch.score,
              winner: 'HOME_TEAM',
              fullTime: { home: 2, away: 1 },
            },
          }}
        />
      );
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
});