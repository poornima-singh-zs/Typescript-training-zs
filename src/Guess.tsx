import React, { useState } from 'react';
import './Guess.css';

const words: string[] = ['hello', 'world', 'react', 'vite', 'guess'];

const Game: React.FC = () => {
  const [word, setWord] = useState<string>(words[Math.floor(Math.random() * words.length)]);
  const [guess, setGuess] = useState<string[]>(new Array(word.length).fill(''));
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');
  const [life, setLife] = useState<number>(5);
  const [win, setWin] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleGuess = (value: string): void => {
    if (!value || value.length !== 1 || win || life <= 0 || currentIndex >= word.length) return;
    const lowerValue = value.toLowerCase();
    setInputValue('');

    const updatedGuess = [...guess];
    if (word[currentIndex] === lowerValue) {
      updatedGuess[currentIndex] = lowerValue;
      setGuess(updatedGuess);
      setMessage(`Letter "${lowerValue}" is correct and in the right position.`);
      setMessageType('correct');
      setCurrentIndex(currentIndex + 1);
    } else if (word.includes(lowerValue)) {
      setMessage(`Letter "${lowerValue}" is present but in the wrong position.`);
      setMessageType('present');
    } else {
        if (life -1 === 0 && !win) {
            setMessage(`Game Over! The word was "${word}".`);
            setMessageType('incorrect');
            setLife(0);
          }
          else{
            setLife((prevLife) => prevLife - 1);
            setMessage(`Letter "${lowerValue}" is not in the word. Life decreased!`);
            setMessageType('incorrect');
          }
      
    }

    if (updatedGuess.join('') === word) {
      setWin(true);
      setMessage('Congratulations! You guessed the word correctly.');
      setMessageType('correct');
    }
  
  };

  const resetGame = (): void => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setGuess(new Array(newWord.length).fill(''));
    setMessage('');
    setLife(5);
    setWin(false);
    setInputValue('');
    setCurrentIndex(0);
    setMessageType('');
  };

  return (
    <div className="game-container">
      <div className="lives">❤️ Lives: {life}</div>
      <h1>Word Guessing Game</h1>
      <div className="word-boxes">
        {guess.map((letter, index) => (
          <div
            key={index}
            className={`letter-box ${letter === word[index] ? 'correct' :  ''}`}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className={`message-box ${messageType}`}>{message}</div>
      {!win && life > 0 && (
        <input
          type="text"
          maxLength={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGuess(inputValue)}
          className="input-box"
          disabled={win || life <= 0}
        />
      )}
      
      {(win || life === 0) && <button onClick={resetGame} className="restart-button">Restart</button>}
    </div>
  );
};

export default Game;

