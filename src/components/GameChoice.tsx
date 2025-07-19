import { Button } from '@/components/ui/button';
import { GameChoice as GameChoiceType } from '@/types/game';
import { getChoiceEmoji } from '@/lib/gameLogic';
import { motion } from 'framer-motion';

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

const getChoiceGradient = (choice: GameChoiceType): string => {
  const gradientMap: Record<GameChoiceType, string> = {
    rock: 'from-slate-500 to-slate-700',
    paper: 'from-blue-500 to-blue-700',
    scissors: 'from-red-500 to-red-700'
  };
  return gradientMap[choice];
};

export const GameChoice = ({ choice, onClick, disabled, selected }: GameChoiceProps) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="relative"
    >
      <Button
        variant="ghost"
        onClick={() => onClick(choice)}
        disabled={disabled}
        className={`
          relative h-32 w-32 rounded-2xl border-0 p-0 overflow-hidden
          bg-gradient-to-br ${getChoiceGradient(choice)}
          shadow-xl hover:shadow-2xl
          transition-all duration-300
          ${selected ? 'ring-4 ring-white ring-opacity-60 scale-105' : ''}
          ${disabled ? 'opacity-50' : 'hover:scale-105'}
        `}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <motion.span 
            className="text-5xl mb-2 filter drop-shadow-lg"
            animate={{ 
              rotate: selected ? [0, -10, 10, 0] : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            {getChoiceEmoji(choice)}
          </motion.span>
          <span className="text-sm font-semibold tracking-wide uppercase">
            {getChoiceName(choice)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </Button>
    </motion.div>
  );
};