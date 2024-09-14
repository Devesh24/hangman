import Word from "./Word";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from "react";

export default function Hangman({wrongGuess, word, guessedLetters, score, hint}) {
  
  //for popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  return (
    <>
      <div className="hangman">
        <div className="mobileScoreBox">
          <div>Guess a Famous Personality</div>
          <div>Current Score: {score}</div>
        </div>
        <div className="top" />
        <div className="hanger" />
        <div className="stand" />
        <div className="base" />
        <div className="head" style={{visibility: wrongGuess.length>=1 ? "visible" : "hidden"}} />
        <div className="neck" style={{visibility: wrongGuess.length>=2 ? "visible" : "hidden"}} />
        <div className="lefthand" style={{visibility: wrongGuess.length>=3 ? "visible" : "hidden"}} />
        <div className="righthand" style={{visibility: wrongGuess.length>=4 ? "visible" : "hidden"}} />
        <div className="leftleg" style={{visibility: wrongGuess.length>=5 ? "visible" : "hidden"}} />
        <div className="rightleg" style={{visibility: wrongGuess.length===6 ? "visible" : "hidden"}} />
        <div className="hangWord" >
          <Word word={word} guessedLetters={guessedLetters}/>
        </div>
        <span className="hintButton mobileIcon" aria-describedby={id} variant="contained" onClick={handleClick}>
          <i class="fa-solid fa-lightbulb"></i>
        </span>
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
          <Typography sx={{ p: 2 }}>{hint}</Typography>
        </Popover>
      </div>
    </>
  );
}
