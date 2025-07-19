import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
}

export const ScoreBoard = ({ playerScore, computerScore }: ScoreBoardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">得分板</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-xl font-bold">
          <div className="text-center">
            <div className="text-blue-600">玩家</div>
            <div className="text-3xl mt-2">{playerScore}</div>
          </div>
          <div className="text-2xl text-gray-400">VS</div>
          <div className="text-center">
            <div className="text-red-600">电脑</div>
            <div className="text-3xl mt-2">{computerScore}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};