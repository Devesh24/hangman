import React from 'react'

export default function Alert(props) {
    
  const btnClick = () => {
    if(props.gameOver)
    {
        window.location.reload();
    }
    if(props.won)
    {
        props.wordSet()
    }
  }

  let title = ""
  let btnTitle = ""
  let wordDisplay = "" 
  let boxHeight = ""
  if(props.gameOver)
  {
    title = "Game Over🤌"
    btnTitle = "Play Again"
    wordDisplay = "block"
    boxHeight = "50vh"
  }
  if(props.won)
  {
    title = "Nice Guess👍"
    btnTitle = "Next"
    wordDisplay = "none"
    boxHeight = "40vh"
  }

  return (
    <>
        <div className="gameOver" style={{height: boxHeight}}>
          <p className="alert">{title}</p>
          <p className="alert" style={{display: wordDisplay}}>Correct Word : <span className="scoredigit">{props.word}</span></p>
          <p className="alert">Total Score : <span className="scoredigit">{props.won ? props.score+1 : props.score}</span></p>
          <div>
            <button className="btn" onClick={btnClick}>{btnTitle}</button>
          </div>
        </div>
    </>
  )
}
