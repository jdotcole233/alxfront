import React, { useState } from 'react';
import Login from './login/login';
import SignUp from './signup/signup';
import "./Start.css";

function Start() {
    const [navigationToggle, setNavigationToggle] = useState(false)

    const navi_click = (isSet) => setNavigationToggle(isSet);

    return (
       <div className="main_screen">
                <div> 
                    <p>Hello! Welcome to ALX Information System</p>
                    <p>Don't have an account?</p>
                    <button onClick={() => navi_click(!navigationToggle)} >
                       { navigationToggle ? "Sign In" : "Sign Up"}
                    </button>
                </div>
                <div> 
                    { navigationToggle  ? <SignUp /> : <Login />}
                </div>
       </div>
    )
}

export default Start
