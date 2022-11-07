import React from "react";

export default function Word(props) {
  return (
    <>
      {props.word.split("").map((letter, ind) => {
          return <span className="letter" key={ind}>
                  <span style={{visibility: props.guessedLetters.includes(letter) ? "visible" : "hidden"}}>{letter}</span>
              </span>
      })}
    </>
  );
}
