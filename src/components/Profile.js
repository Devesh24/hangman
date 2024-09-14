import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { BASE_URL } from '../config'
import { useAuth } from '../Hooks/auth'

const Profile = () => {
    const { cookies } = useAuth();
    const [userData, setUserData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = cookies.token;
                const data = await axios.post(`${BASE_URL}/user`, {
                    token: accessToken
                }, 
                {
                    headers: {
                        token: `Bearer ${accessToken}`,
                    },
                })
                setUserData(data.data)
                data.data.pastScores.reverse()
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])
  return (
    <>
        <Navbar username={userData.name} />
        <div className="profile_main_cont">
            <div className='profile_inner_cont'>
                <div className='profile_data'>
                    <p className='profile_heading'>Highest Score</p>
                    <div className='profile_data_box'>
                        <div className='profile_scoreBox'>
                            <p>Score: </p>
                            <p>{userData.highestScore ? userData.highestScore.score : 0}</p>
                        </div>
                        <p>{userData.highestScore && userData.highestScore.score!== 0 ? new Date(userData.highestScore.date).toDateString() : ""}</p>
                    </div>
                </div>
                <div className='profile_data'>
                    <p className='profile_heading'>Past Scores</p>
                    {
                        userData.pastScores && userData.pastScores.length === 0 && <div className='profile_data_box'>You have not played any game.</div>
                    }
                    {
                        userData.pastScores && userData.pastScores.map((item, ind) => (
                            <div className='profile_data_box' key={ind}>
                                <div className='profile_scoreBox'>
                                    <p>Score: </p>
                                    <p>{item.score}</p>
                                </div>
                                <p>{ new Date(item.date).toDateString() }</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile