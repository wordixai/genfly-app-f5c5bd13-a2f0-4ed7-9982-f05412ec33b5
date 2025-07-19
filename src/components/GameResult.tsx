import { Card, CardContent } from '@/components/ui/card';
import { GameChoice } from '@/types/game';
import { getChoiceEmoji, getResultText } from '@/lib/gameLogic';

interface GameResultProps {
  playerChoice: GameChoice;
  computerChoice: GameChoice;
  result: 'win' | 'lose' | 'draw';
  isVisible: boolean;
}

export const GameResult = ({ 
  playerChoice, 
  computerChoice, 
  result, 
  isVisible 
}: GameResultProps) => {
  if (!isVisible) return null;

  return (
    <Card className="w-full max-w-md animate-in fade-in duration-500">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">你的选择</div>
              <div className="text-6xl">{getChoiceEmoji(playerChoice)}</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">VS</div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">电脑选择</div>
              <div className="text-6xl">{getChoiceEmoji(computerChoice)}</div>
            </div>
          </div>
          <div className={`text-2xl font-bold ${
            result === 'win' ? 'text-green-600' : 
            result === 'lose' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {getResultText(result)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};