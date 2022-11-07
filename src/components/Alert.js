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
  if(props.gameOver)
  {
    title = "Game Over🤌"
    btnTitle = "Play Again"
  }
  if(props.won)
  {
    title = "Nice Guess👍"
    btnTitle = "Next"
  }

  return (
    <>
        <div className="gameOver">
          <p className="alert">{title}</p>
          <p className="alert">Total Score : <span className="scoredigit">{props.won ? props.score+1 : props.score}</span></p>
          <div>
            <button className="btn" onClick={btnClick}>{btnTitle}</button>
          </div>
        </div>
    </>
  )
}
