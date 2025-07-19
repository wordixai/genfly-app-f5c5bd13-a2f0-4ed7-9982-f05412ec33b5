import { GameChoice, GameResult } from '@/types/game';

export const CHOICES: GameChoice[] = ['rock', 'paper', 'scissors'];

export const getRandomChoice = (): GameChoice => {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
};

export const determineWinner = (
  playerChoice: GameChoice,
  computerChoice: GameChoice
): 'win' | 'lose' | 'draw' => {
  if (playerChoice === computerChoice) return 'draw';

  const winConditions: Record<GameChoice, GameChoice> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
};

export const getChoiceEmoji = (choice: GameChoice): string => {
  const emojiMap: Record<GameChoice, string> = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
  };
  return emojiMap[choice];
};

export const getResultText = (result: 'win' | 'lose' | 'draw'): string => {
  switch (result) {
    case 'win':
      return '你赢了！🎉';
    case 'lose':
      return '你输了！😢';
    case 'draw':
      return '平局！🤝';
  }
};