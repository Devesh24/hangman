import React from "react";
import Word from "./Word";

export default function Hangman(props) {
  
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
      </div>
    </>
  );
}
