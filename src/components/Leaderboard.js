import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { BASE_URL } from '../config'
import { useAuth } from '../Hooks/auth'

const Leaderboard = () => {
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
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])

    const [rankingsData, setRankingsData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`${BASE_URL}/user`)
                setRankingsData(data.data)
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
                    <p className='profile_heading'>Top 10 User Rankings</p>
                    {
                        rankingsData[0] && rankingsData.map((item, ind) => (
                            <div className='profile_data_box'>
                                <div className='profile_scoreBox'>
                                    <p>{item.name}</p>
                                    <p style={{color: "grey", fontSize: "1rem"}}>( {item.username} )</p>
                                </div>
                                <p className='scoredigit'>{item.highestScore.score}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Leaderboard