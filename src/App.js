import React, { useState, useEffect } from "react";
import "./App.css";
import Hangman from "./components/Hangman";
import Keyboard from "./components/Keyboard";
import Words from "./components/words.json";
import Word from "./components/Word";
import Alert from "./components/Alert"; 
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function App() {
    
  //for popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const [wordObj, setWordObj] = useState(() => {
    return Words[Math.floor(Math.random() * Words.length)];
  });
  const [word, setWord] = useState(wordObj.name.toUpperCase())
  useEffect(()=>{
    setWord(wordObj.name.toUpperCase())
  }, [wordObj])

  const [score, setScore] = useState(0)
  const wordSet = () => {
    setGuessedLetters([])
    setWrongGuess([])
    setRightGuess([])
    setWordObj(Words[Math.floor(Math.random() * Words.length)])
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

    
  return (
    <>
      <div className="container" style={{display: visible ? "none" : "flex"}}>
        <div>
          <Hangman wrongGuess={wrongGuess} word={word} guessedLetters={guessedLetters} score={score} hint={wordObj.hint} />
          <span className="score">Score : "<span className="scoredigit">{score}</span>"</span>
        </div>
        <div className="combine">
          <div className="blankHead">
            <p className="blankHeadName">Guess an Animal</p>
            <span className="blankHeadIcon" aria-describedby={id} variant="contained" onClick={handleClick}>💡</span>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography sx={{ p: 2 }}>{wordObj.hint}</Typography>
            </Popover>
          </div>  
          <div className="blank">
            <Word word={word} guessedLetters={guessedLetters}/>
          </div>
          <Keyboard addLetter={addLetter} guessedLetters={guessedLetters}/>
        </div>
      </div>
      <div className="game" style={{display: visible ? "flex" : "none"}}>
        <Alert gameOver={wrongGuess.length>=6 ? true : false} won={rightGuess.length===uniqueLetters.length ? true : false} wordSet={wordSet} score={score} word={word}/>
      </div>
    </>
  );
}

export default App;
