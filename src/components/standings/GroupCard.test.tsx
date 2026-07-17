import { render, screen } from '@testing-library/react';
  import { describe, expect, it } from 'vitest';
  import GroupCard from './GroupCard';
  import type { Group } from '../../api/types';
  const mockGroup: Group = {
    stage: 'GROUP_STAGE',
    type: 'TOTAL',
    group: 'GROUP_A',
    table: [
      {
        position: 1,
        team: {
          id: 1,
          name: 'Brazil',
          shortName: 'Brazil',
          tla: 'BRA',
          crest: 'https://example.com/bra.png',
        },
        playedGames: 3,
        won: 2,
        draw: 1,
        lost: 0,
        points: 7,
        goalsFor: 6,
        goalsAgainst: 2,
        goalDifference: 4,
      },
      {
        position: 2,
        team: {
          id: 2,
          name: 'Spain',
          shortName: 'Spain',
          tla: 'ESP',
          crest: 'https://example.com/esp.png',
        },
        playedGames: 3,
        won: 2,
        draw: 0,
        lost: 1,
        points: 6,
        goalsFor: 5,
        goalsAgainst: 3,
        goalDifference: 2,
      },
    ],
  };
  describe('GroupCard', () => {
    it('renders group title and team rows', () => {
      render(<GroupCard group={mockGroup} qualifiedTeamIds={new Set([1])} />);
      expect(screen.getByText('Group A')).toBeInTheDocument();
      expect(screen.getByText('Brazil')).toBeInTheDocument();
      expect(screen.getByText('Spain')).toBeInTheDocument();
    });
    it('applies qualifying highlight class to qualified teams', () => {
      render(<GroupCard group={mockGroup} qualifiedTeamIds={new Set([1])} />);
      const brazilRow = screen.getByText('Brazil').closest('tr');
      const spainRow = screen.getByText('Spain').closest('tr');
      expect(brazilRow).toHaveClass('bg-gold/15');
      expect(spainRow).not.toHaveClass('bg-gold/15');
    });
});