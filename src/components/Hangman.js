import React from "react";
import Word from "./Word";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function Hangman(props) {
  
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

  return (
    <>
      <div className="hangman">
        <div className="hangblankHead">
          <div>Guess an Animal</div>
          <div>Score: {props.score}</div>
        </div>
        <div className="top" />
        <div className="hanger" />
        <div className="stand" />
        <div className="base" />
        <div className="head" style={{visibility: props.wrongGuess.length>=1 ? "visible" : "hidden"}} />
        <div className="neck" style={{visibility: props.wrongGuess.length>=2 ? "visible" : "hidden"}} />
        <div className="lefthand" style={{visibility: props.wrongGuess.length>=3 ? "visible" : "hidden"}} />
        <div className="righthand" style={{visibility: props.wrongGuess.length>=4 ? "visible" : "hidden"}} />
        <div className="leftleg" style={{visibility: props.wrongGuess.length>=5 ? "visible" : "hidden"}} />
        <div className="rightleg" style={{visibility: props.wrongGuess.length===6 ? "visible" : "hidden"}} />
        <div className="hangWord" >
          <Word word={props.word} guessedLetters={props.guessedLetters}/>
        </div>
        <span className="blankHeadIcon mobileIcon" aria-describedby={id} variant="contained" onClick={handleClick}>💡</span>
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
          <Typography sx={{ p: 2 }}>{props.hint}</Typography>
        </Popover>
      </div>
    </>
  );
}
