const alphabets = [
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

export default function Keyboard({addLetter, guessedLetters}) {
  return (
    <>
      <div className="keyboard">
        {alphabets.map((elem, ind) => (
          <button
            disabled={guessedLetters.includes(elem) ? "disabled" : ""}
            className="key"
            onClick={() => addLetter(elem)}
            key={ind}
          >
            {elem}
          </button>
        ))}
      </div>
    </>
  );
}
