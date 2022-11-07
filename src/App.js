import React, { useState, useEffect } from "react";
import "./App.css";
import Hangman from "./components/Hangman";
import Keyboard from "./components/Keyboard";
import Words from "./components/words.json";
import Word from "./components/Word";
import Alert from "./components/Alert";

function App() {

  const [word, setWord] = useState(() => {
    return Words[Math.floor(Math.random() * Words.length)].toUpperCase();
  });
  
  const [score, setScore] = useState(0)
  const wordSet = () => {
    setGuessedLetters([])
    setWrongGuess([])
    setRightGuess([])
    setWord(Words[Math.floor(Math.random() * Words.length)].toUpperCase())
    setScore(score + 1)
  }

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuess, setWrongGuess] = useState([])
  const [rightGuess, setRightGuess] = useState([])

  const addLetter = (letter) => {
    if(guessedLetters.includes(letter)) return

    setGuessedLetters(curr => [letter, ...curr])
    if(!word.split("").includes(letter))
    {
      setWrongGuess(curr => [letter, ...curr])
    }
    if(word.split("").includes(letter))
    {
      setRightGuess(curr => [letter, ...curr])
    }
  }

    let visible = false
    let uniqueLetters = word.split("").filter((item, index) => word.split("").indexOf(item) === index);
    if(wrongGuess.length>=6 || rightGuess.length===uniqueLetters.length)
    {
      visible = true;
    }

    useEffect(() => {
      const handler = (elem) => {
        const key = elem.key

        if(!key.match(/^[a-z]$/)) return
        elem.preventDefault()
        addLetter(key.toUpperCase())
      }

      document.addEventListener("keypress", handler)

      return ()=>{
        document.removeEventListener("keypress", handler)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guessedLetters])
    
  return (
    <>
      <div className="container" style={{display: visible ? "none" : "flex"}}>
        <div>
          <Hangman wrongGuess={wrongGuess} word={word} guessedLetters={guessedLetters} score={score} />
          <span className="score">Score : "<span className="scoredigit">{score}</span>"</span>
        </div>
        <div className="combine">
          <div className="blankHead">Guess an Animal :</div>  
          <div className="blank">
            <Word word={word} guessedLetters={guessedLetters}/>
          </div>
          <Keyboard addLetter={addLetter} guessedLetters={guessedLetters}/>
        </div>
      </div>
      <div className="game" style={{display: visible ? "flex" : "none"}}>
        <Alert gameOver={wrongGuess.length>=6 ? true : false} won={rightGuess.length===uniqueLetters.length ? true : false} wordSet={wordSet} score={score}/>
      </div>
    </>
  );
}

export default App;
