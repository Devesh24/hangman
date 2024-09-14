import React, { useState, useEffect, useCallback } from "react";
import Hangman from "./Hangman";
import Keyboard from "./Keyboard";
import Word from "./Word";
import Alert from "./Alert";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { BASE_URL } from "../config";
import Navbar from "./Navbar";
import { useAuth } from "../Hooks/auth";

function Game() {
  const { cookies } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = cookies.token;
        const data = await axios.post(
          `${BASE_URL}/user`,
          {
            token: accessToken,
          },
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        setUserData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [Words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [wordObj, setWordObj] = useState({});
  const [uniqueLetters, setUniqueLetters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${BASE_URL}/famousPerson`);
      setWords(data.data);
      const temp = data.data[Math.floor(Math.random() * data.data.length)];
      const tempWord = temp.name.toUpperCase();
      setWordObj(temp);
      setWord(tempWord);
      setUniqueLetters(
        tempWord
          .split("")
          .filter(
            (item, index) =>
              item !== " " && tempWord.split("").indexOf(item) === index
          )
      );
    };
    fetchData();
  }, []);

  //for popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [score, setScore] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuess, setWrongGuess] = useState([]);
  const [rightGuess, setRightGuess] = useState([]);

  const wordSet = () => {
    setGuessedLetters([]);
    setWrongGuess([]);
    setRightGuess([]);

    const temp = Words[Math.floor(Math.random() * Words.length)];
    const tempWord = temp.name.toUpperCase();
    setWordObj(temp);
    setWord(tempWord);
    setUniqueLetters(
      tempWord
        .split("")
        .filter(
          (item, index) =>
            item !== " " && tempWord.split("").indexOf(item) === index
        )
    );
    setWon(false);

    setScore(score + 1);
  };

  const addLetter = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters((curr) => [letter, ...curr]);

      if (uniqueLetters.includes(letter) || word.includes(letter)) {
        setRightGuess((curr) => [letter, ...curr]);
      } else {
        setWrongGuess((curr) => [letter, ...curr]);
      }
    }
  };

  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  useEffect(() => {
    if (wrongGuess.length >= 6) {
      setGameOver(true);
    } else if (
      uniqueLetters.length > 0 &&
      rightGuess.length === uniqueLetters.length
    ) {
      setWon(true);
    }
  }, [wrongGuess, rightGuess]);

  useEffect(() => {
    const handler = (elem) => {
      const key = elem.key;

      if (!key.match(/^[a-z]$/)) return;
      elem.preventDefault();
      addLetter(key.toUpperCase());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, uniqueLetters, guessedLetters]);

  return (
    <>
      <Navbar username={userData.name} />
      <div
        className="homeContainer"
        style={{ display: gameOver | won ? "none" : "flex" }}
      >
        <div>
          <Hangman
            wrongGuess={wrongGuess}
            word={word}
            guessedLetters={guessedLetters}
            score={score}
            hint={wordObj.hint}
          />
          <div className="score">
            <p>Current Score:</p>
            <p className="scoredigit">{score}</p>
          </div>
        </div>
        <div className="homeRight">
          <div className="hintBox">
            <div className="highestBox">
              <div>Highest Score: </div>
              <div className="scoredigit">
                {userData.highestScore ? userData.highestScore.score : 0}
              </div>
            </div>
            <p
              className="hintButton"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <i class="fa-solid fa-lightbulb"></i>
            </p>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>{wordObj.hint}</Typography>
            </Popover>
          </div>
          <div className="wordToGuess">
            <Word word={word} guessedLetters={guessedLetters} />
          </div>
          <Keyboard addLetter={addLetter} guessedLetters={guessedLetters} />
        </div>
      </div>
      <div
        className="game"
        style={{ display: gameOver | won ? "flex" : "none" }}
      >
        <Alert
          gameOver={gameOver}
          won={won}
          wordSet={wordSet}
          score={score}
          word={word}
          userId={userData._id}
          pastScores={userData.pastScores}
          highestScore={userData.highestScore?.score}
        />
      </div>
    </>
  );
}

export default Game;
