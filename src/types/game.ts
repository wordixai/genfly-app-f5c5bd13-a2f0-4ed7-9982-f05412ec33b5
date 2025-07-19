export type GameChoice = 'rock' | 'paper' | 'scissors';

export interface GameState {
  playerChoice: GameChoice | null;
  computerChoice: GameChoice | null;
  playerScore: number;
  computerScore: number;
  gameHistory: GameResult[];
  isPlaying: boolean;
}

export interface GameResult {
  id: string;
  playerChoice: GameChoice;
  computerChoice: GameChoice;
  result: 'win' | 'lose' | 'draw';
  timestamp: number;
}