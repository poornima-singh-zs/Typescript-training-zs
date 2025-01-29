import { useState } from 'react';
import './App.css';

function App() {
  const words: string[] = ['hello', 'world', 'react', 'vite', 'javascript'];
  const [word, setWord] = useState<string>(words[Math.floor(Math.random() * words.length)]);
  const [guess, setGuess] = useState<string[]>(new Array(word.length).fill(''));
  const [message, setMessage] = useState<string>('');
  const [life, setLife] = useState<number>(5);
  const [win, setWin] = useState<boolean>(false);

  const handleGuess = (value: string, index: number): void => {
    const updatedGuess = [...guess];
    updatedGuess[index] = value.toLowerCase();
    setGuess(updatedGuess);

    if (value === '') {
      setMessage('');
    } else if (value.toLowerCase() === word[index]) {
      setMessage(`Letter "${value}" is correct and in the right position. Keep going`);
    } else if (word.includes(value.toLowerCase())) {
      setMessage(`Letter "${value}" is present but in the wrong position.`);
    } else {
      if (life - 1 === 0 && !win) {
        setMessage(`Game Over 💀 The word was "${word}".`);
        setLife(0);
      } else {
        setLife((prevLife) => prevLife - 1);
        setMessage(`Letter "${value}" is not in the word. Life decreased 😰!`);
      }
    }

    if (updatedGuess.join('') === word) {
      setWin(true);
      setMessage('Congratulations 🥳 You guessed the word correctly.');
    }
  };

  const resetGame = (): void => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setGuess(new Array(newWord.length).fill(''));
    setMessage('');
    setLife(5);
    setWin(false);
  };

  return (
    <div className="parent">
      <div className="child">
        <h1>Word Guessing Game</h1>
        <h2>Life: {life}</h2>
        

        {!win && life > 0 && (
          <div>
            {word.split('').map((_, index) => (
              <input
                key={index}
                className="box"
                value={guess[index]}
                onChange={(e) => handleGuess(e.target.value, index)}
                maxLength={1}
                disabled={win || life <= 0}
                style={{
                  backgroundColor: 
                    guess[index] === word[index] 
                      ? 'green' 
                      : guess[index] && word.includes(guess[index].toLowerCase()) 
                      ? 'orange'
                      : guess[index] 
                      ? 'red' 
                      : '',
                  color: 'white',
                  textAlign: 'center',
                  height: '50px',
                  width: '50px',
                  margin: '5px',
                  fontSize: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              />
            ))}
            <br />
          </div>
        )}
        <h2>{message}</h2>
        <br />
        {(win || life === 0) && <button onClick={resetGame}>Restart</button>}
      </div>
    </div>
  );
}

export default App;
