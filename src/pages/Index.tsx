import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameChoice } from '@/components/GameChoice';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameResult } from '@/components/GameResult';
import { useGameState } from '@/hooks/useGameState';
import { CHOICES } from '@/lib/gameLogic';
import { GameChoice as GameChoiceType } from '@/types/game';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Play } from 'lucide-react';

const Index = () => {
  const { gameState, makeMove, resetGame, newRound } = useGameState();
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (gameState.isPlaying && gameState.playerChoice && gameState.computerChoice) {
      setTimeout(() => setShowResult(true), 500);
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
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-5xl py-12 px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            石头剪刀布
          </h1>
          <p className="text-xl text-gray-300 font-medium">
            经典对战，现代体验 ✨
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-10">
          {/* Score Board */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ScoreBoard 
              playerScore={gameState.playerScore} 
              computerScore={gameState.computerScore} 
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {showResult && gameState.playerChoice && gameState.computerChoice ? (
              <motion.div 
                key="result"
                className="flex flex-col items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GameResult
                  playerChoice={gameState.playerChoice}
                  computerChoice={gameState.computerChoice}
                  result={gameState.gameHistory[0]?.result || 'draw'}
                  isVisible={showResult}
                />
                
                <div className="flex gap-6">
                  <Button 
                    onClick={handleNewRound} 
                    size="lg"
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-xl rounded-xl font-bold text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    再来一局
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-xl rounded-xl font-bold text-lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    重置游戏
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="choices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-white">
                      选择你的武器 ⚔️
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <div className="flex justify-center gap-8">
                      {CHOICES.map((choice, index) => (
                        <motion.div
                          key={choice}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <GameChoice
                            choice={choice}
                            onClick={handleChoice}
                            disabled={gameState.isPlaying}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game History */}
          {gameState.gameHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="w-full max-w-lg bg-white/5 backdrop-blur-sm border-white/10 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-center text-lg font-bold text-white flex items-center justify-center gap-2">
                    📊 战绩记录
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {gameState.gameHistory.slice(0, 5).map((game, index) => (
                      <motion.div 
                        key={game.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{game.playerChoice === 'rock' ? '🪨' : game.playerChoice === 'paper' ? '📄' : '✂️'}</span>
                          <span className="text-white/60">vs</span>
                          <span className="text-2xl">{game.computerChoice === 'rock' ? '🪨' : game.computerChoice === 'paper' ? '📄' : '✂️'}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          game.result === 'win' ? 'bg-green-500 text-white' : 
                          game.result === 'lose' ? 'bg-red-500 text-white' : 
                          'bg-yellow-500 text-black'
                        }`}>
                          {game.result === 'win' ? '胜利' : game.result === 'lose' ? '失败' : '平局'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;