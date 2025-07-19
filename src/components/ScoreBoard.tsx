import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
}

export const ScoreBoard = ({ playerScore, computerScore }: ScoreBoardProps) => {
  return (
    <Card className="w-full max-w-lg bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="text-center"
            animate={{ scale: playerScore > computerScore ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-blue-600 mb-2">🧑‍💻</div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">玩家</div>
            <motion.div 
              className="text-5xl font-black text-blue-600"
              key={playerScore}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {playerScore}
            </motion.div>
          </motion.div>
          
          <div className="text-center mx-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">VS</span>
            </div>
          </div>
          
          <motion.div 
            className="text-center"
            animate={{ scale: computerScore > playerScore ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-red-600 mb-2">🤖</div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">电脑</div>
            <motion.div 
              className="text-5xl font-black text-red-600"
              key={computerScore}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {computerScore}
            </motion.div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};