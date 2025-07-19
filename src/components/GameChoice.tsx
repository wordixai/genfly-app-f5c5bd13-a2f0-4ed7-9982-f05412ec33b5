import { Button } from '@/components/ui/button';
import { GameChoice as GameChoiceType } from '@/types/game';
import { getChoiceEmoji } from '@/lib/gameLogic';

interface GameChoiceProps {
  choice: GameChoiceType;
  onClick: (choice: GameChoiceType) => void;
  disabled?: boolean;
  selected?: boolean;
}

const getChoiceName = (choice: GameChoiceType): string => {
  const nameMap: Record<GameChoiceType, string> = {
    rock: '石头',
    paper: '布',
    scissors: '剪刀'
  };
  return nameMap[choice];
};

export const GameChoice = ({ choice, onClick, disabled, selected }: GameChoiceProps) => {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      size="lg"
      onClick={() => onClick(choice)}
      disabled={disabled}
      className={`h-24 w-24 flex flex-col items-center justify-center text-lg font-semibold transition-all duration-200 hover:scale-105 ${
        selected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
    >
      <span className="text-2xl mb-1">{getChoiceEmoji(choice)}</span>
      <span className="text-sm">{getChoiceName(choice)}</span>
    </Button>
  );
};