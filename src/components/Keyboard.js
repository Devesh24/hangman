import React from "react";

let alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Keyboard(props) {
  return (
    <>
      <div className="keyboard">
        {alphabets.map((elem, ind) => {
          return (
            <button
              disabled={props.guessedLetters.includes(elem) ? "disabled" : ""}
              className="key"
              onClick={() => props.addLetter(elem)}
              key={ind}
            >
              {elem}
            </button>
          );
        })}
      </div>
    </>
  );
}
