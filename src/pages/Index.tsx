import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameChoice } from '@/components/GameChoice';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameResult } from '@/components/GameResult';
import { useGameState } from '@/hooks/useGameState';
import { CHOICES } from '@/lib/gameLogic';
import { GameChoice as GameChoiceType } from '@/types/game';

const Index = () => {
  const { gameState, makeMove, resetGame, newRound } = useGameState();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (gameState.isPlaying && gameState.playerChoice && gameState.computerChoice) {
      setShowResult(true);
    }
  }, [gameState.isPlaying, gameState.playerChoice, gameState.computerChoice]);

  const handleChoice = (choice: GameChoiceType) => {
    makeMove(choice);
  };

  const handleNewRound = () => {
    setShowResult(false);
    newRound();
  };

  const handleReset = () => {
    setShowResult(false);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">石头剪刀布</h1>
          <p className="text-xl text-gray-600">经典游戏，永恒的乐趣！</p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <ScoreBoard 
            playerScore={gameState.playerScore} 
            computerScore={gameState.computerScore} 
          />

          {showResult && gameState.playerChoice && gameState.computerChoice ? (
            <div className="flex flex-col items-center gap-6">
              <GameResult
                playerChoice={gameState.playerChoice}
                computerChoice={gameState.computerChoice}
                result={gameState.gameHistory[0]?.result || 'draw'}
                isVisible={showResult}
              />
              <div className="flex gap-4">
                <Button onClick={handleNewRound} size="lg">
                  再来一局
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  重置游戏
                </Button>
              </div>
            </div>
          ) : (
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center">选择你的武器</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-6">
                  {CHOICES.map((choice) => (
                    <GameChoice
                      key={choice}
                      choice={choice}
                      onClick={handleChoice}
                      disabled={gameState.isPlaying}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {gameState.gameHistory.length > 0 && (
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center text-lg">游戏历史</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {gameState.gameHistory.slice(0, 5).map((game) => (
                    <div 
                      key={game.id} 
                      className="flex justify-between items-center p-2 rounded bg-gray-50"
                    >
                      <span className="text-sm">
                        {game.playerChoice} vs {game.computerChoice}
                      </span>
                      <span className={`text-sm font-semibold ${
                        game.result === 'win' ? 'text-green-600' : 
                        game.result === 'lose' ? 'text-red-600' : 
                        'text-yellow-600'
                      }`}>
                        {game.result === 'win' ? '胜' : game.result === 'lose' ? '负' : '平'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {(gameState.playerScore > 0 || gameState.computerScore > 0) && (
            <Button 
              onClick={handleReset} 
              variant="outline" 
              className="mt-4"
            >
              重新开始游戏
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;