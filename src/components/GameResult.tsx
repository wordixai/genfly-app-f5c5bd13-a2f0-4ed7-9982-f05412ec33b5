import { Card, CardContent } from '@/components/ui/card';
import { GameChoice } from '@/types/game';
import { getChoiceEmoji, getResultText } from '@/lib/gameLogic';
import { motion } from 'framer-motion';

interface GameResultProps {
  playerChoice: GameChoice;
  computerChoice: GameChoice;
  result: 'win' | 'lose' | 'draw';
  isVisible: boolean;
}

const getResultColor = (result: 'win' | 'lose' | 'draw') => {
  switch (result) {
    case 'win':
      return 'from-green-500 to-emerald-600';
    case 'lose':
      return 'from-red-500 to-rose-600';
    case 'draw':
      return 'from-yellow-500 to-orange-600';
  }
};

const getResultEmoji = (result: 'win' | 'lose' | 'draw') => {
  switch (result) {
    case 'win':
      return '🎉';
    case 'lose':
      return '😔';
    case 'draw':
      return '🤝';
  }
};

export const GameResult = ({ 
  playerChoice, 
  computerChoice, 
  result, 
  isVisible 
}: GameResultProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      className="w-full max-w-lg"
    >
      <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex justify-between items-center mb-8 relative">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">你的选择</div>
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-4xl filter drop-shadow-lg">
                    {getChoiceEmoji(playerChoice)}
                  </span>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex flex-col items-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-3xl mb-2">⚔️</div>
                <div className="text-sm font-bold text-gray-400">VS</div>
              </motion.div>
              
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">电脑选择</div>
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-4xl filter drop-shadow-lg">
                    {getChoiceEmoji(computerChoice)}
                  </span>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`
                inline-flex items-center gap-3 px-8 py-4 rounded-2xl
                bg-gradient-to-r ${getResultColor(result)}
                text-white font-bold text-xl shadow-xl
              `}
            >
              <span className="text-3xl">{getResultEmoji(result)}</span>
              <span>{getResultText(result)}</span>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};