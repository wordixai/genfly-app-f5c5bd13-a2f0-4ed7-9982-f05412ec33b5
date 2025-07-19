import { useState, useCallback } from 'react';
import { GameState, GameChoice, GameResult } from '@/types/game';
import { getRandomChoice, determineWinner } from '@/lib/gameLogic';

const initialState: GameState = {
  playerChoice: null,
  computerChoice: null,
  playerScore: 0,
  computerScore: 0,
  gameHistory: [],
  isPlaying: false
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const makeMove = useCallback((playerChoice: GameChoice) => {
    const computerChoice = getRandomChoice();
    const result = determineWinner(playerChoice, computerChoice);

    const gameResult: GameResult = {
      id: Date.now().toString(),
      playerChoice,
      computerChoice,
      result,
      timestamp: Date.now()
    };

    setGameState(prevState => ({
      ...prevState,
      playerChoice,
      computerChoice,
      playerScore: result === 'win' ? prevState.playerScore + 1 : prevState.playerScore,
      computerScore: result === 'lose' ? prevState.computerScore + 1 : prevState.computerScore,
      gameHistory: [gameResult, ...prevState.gameHistory.slice(0, 9)],
      isPlaying: true
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  const newRound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      playerChoice: null,
      computerChoice: null,
      isPlaying: false
    }));
  }, []);

  return {
    gameState,
    makeMove,
    resetGame,
    newRound
  };
};