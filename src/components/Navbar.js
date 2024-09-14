import React from 'react'
import logo from "./logo.jpeg"
import { Link } from 'react-router-dom'
import { useAuth } from '../Hooks/auth'

const Navbar = ({username}) => {
    const path = window.location.pathname
    const { logout } = useAuth();

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            logout();
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <>
    <nav className="">
        <div className='logoBox'>
            <Link to="/hangman" className="logo">
                <img className="logo_img" src={logo} alt="" />
            </Link>
            <Link to={"/hangman"} className="logoText">
            HANGMAN
            </Link>
        </div>
        <p className="navText">{path === '/leaderboard' ? "LeaderBoard" : path === "/profile" ? "Profile" : "Guess a Famous Personality"}</p>
        <div className="btnGroup">
            <div className='usertext'>{username}</div>
            <Link
            to={"/profile"}
            className="logoutBtn"
            title="Profile"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="Profile"
            >
            <i class="fa-regular fa-user"></i>
            </Link>
            <Link 
            to={"/leaderboard"}
            className="logoutBtn"
            title="Leaderboard"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="Leaderboard"
            >
            <i class="fa-solid fa-table-columns"></i>
            </Link>
            
            <div
            className="logoutBtn"
            title="Logout"
            onClick={handleLogOut}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="Logout"
            >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar