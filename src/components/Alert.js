import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../config";
import { useAuth } from "../Hooks/auth";
import Confetti from "react-confetti";

export default function Alert({ gameOver, won, wordSet, score, word, userId, pastScores, highestScore }) {
  const { cookies } = useAuth();

  useEffect(() => {
    const updateData = async () => {
      try {
        const accessToken = cookies.token;
        
        pastScores.push({
            score: score, 
            date: Date.now()
        })
        const newPastScores = pastScores.slice(-10)
        let toUpdate
        if(score >= highestScore)
        {
            toUpdate = {
                pastScores: newPastScores,
                highestScore: {
                    score: score, date: Date.now()
                }
            }
        }
        else
        {
          toUpdate = {
              pastScores: newPastScores
          }
        }

        await axios.put(`${BASE_URL}/user/${userId}`, toUpdate, 
        {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        })
      } catch (error) {
        console.log(error);
      }
    }
    if(gameOver) updateData()
  },[gameOver])

  const btnClick = async () => {
    if (gameOver) {
        window.location.reload();
    }
    if (won) {
      wordSet();
    }
  };

  let title = "";
  let btnTitle = "";
  let wordDisplay = "";
  if (gameOver) {
    title = "Game Over🤌";
    btnTitle = "Play Again";
    wordDisplay = "block";
  }
  if (won) {
    title = "Nice Guess👍";
    btnTitle = "Next";
    wordDisplay = "none";
  }

  return (
    <>
      {score+1 > highestScore && <Confetti />}
      <div className="gameOver">
      <div style={{color: "greenyellow"}}>Congratulations!!! New Highscore Reached</div>
        <div>{title}</div>
        <div className={`${wordDisplay==="block" ? 'd-flex' : 'd-none'} gap-2`}>
          <p>Correct Word : </p>
          <p>{word}</p>
        </div>
        <div className="d-flex gap-2">
          <p>Total Score :</p>
          <p>{won ? score + 1 : score}</p>
        </div>
        <div>
          <button className="btn" onClick={btnClick}>
            {btnTitle}
          </button>
        </div>
      </div>
    </>
  );
}
