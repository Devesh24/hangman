import React from "react";

export default function Word({word, guessedLetters}) {
  return (
    <>
      {word.split("").map((letter, ind) => (
        <span className="letter" key={ind}>
          <span style={{visibility: guessedLetters.includes(letter) ? "visible" : "hidden"}}>{letter}</span>
        </span>
      ))}
    </>
  );
}
