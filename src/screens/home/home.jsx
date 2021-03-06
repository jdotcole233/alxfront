import React, { useState, useEffect} from 'react'
import axios from 'axios';
import "./home.css"
import Jokes from "./jokes"
import Random from "./random"
import {useLocation,Redirect} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import PROFILE_PIC from '../../asset/images/profile.png'

function Home() {
    const [isToggled, setIsToggled] = useState(false);
    const [jokesState, setJokesState] = useState ({
        isLoading: false,
        data: []
    });

    const {user, setUser} = useAuth()
    useEffect(() => {
        fetch('https://official-joke-api.appspot.com/jokes/ten')
        .then(res => res.json())
        .then(data => {
            setJokesState({
                isLoading: true,
                data: data
            });
            console.log(jokesState)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleApiChange = (toggled) => {
        console.log("hello")
        setIsToggled(toggled);
    }


    if (!user) {
      return <Redirect to="/" />;
    }

    if (!jokesState.isLoading) return <h1> Loading ...</h1>;

    

    return (
      <div className="row">
        <div style={{ backgroundColor: " #3D447A" }} className="col-lg-1">
          <div className="top_nav">
            <div>
              <img src={PROFILE_PIC} style={{width: 75}} alt="profile" />
              <p style={{wordBreak: "break-word", width: 80, lineHeight: 1}} >{user?.name}</p>
            </div>
            <nav>
              {/* <p>Navigation</p> */}
              <span onClick={() => handleApiChange(true)}>
                Jokes API{" "}
              </span>
              <span onClick={() => handleApiChange(false)}>
                Kitsu API{" "}
              </span>
              <span onClick={() => setUser(null)}>Logout </span>
            </nav>
          </div>
        </div>

        <div className="col-lg-11 container-fluid">
          {!isToggled ? <Random /> : <Jokes data={jokesState.data} />}
        </div>
      </div>
    );
}

export default Home
