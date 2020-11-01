import React,{useState} from 'react'
import {Redirect} from "react-router-dom"
import {useStyles} from "../util.js"
import Axios from "axios"
import qs from "qs"
import { TextField } from "@material-ui/core";
import Loading from "../Pages/Loading.js"
import wave from "../Images/wave.png"
import logo from "../Images/logo192.png"
import forgotPassword from "../Images/forgot-password.svg"
import "../Pages-css/ForgotPassword.css"
function ForgotPasswordStudent() {
    const classes = useStyles();
    const [username, setusername] = useState("");
    const [validate_username, setvalidate_username] = useState({
        error_state:false,
        error_message:""
    });
    const [redirect_state, setredirect_state] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [open, setopen] = useState(false);
    const handleChange = (event) => {
        const value  = event.target.value;
        setusername((prevValue) => {
            return{
                ...prevValue,value
            }
        });
    }
    const handleSubmit = (e) => {
        setopen(true);
        e.preventDefault();
        if(username.length > 0){
            const data = qs.stringify({
                id: username
            });
            var config = {
                method: 'get',
                url: 'http://localhost:3000/student/getotp',
                data : data,
            };
            Axios(config)
            .then((response) => {
                console.log(response);
                if(response.data.status === "success"){
                    setopen(false);
                    localStorage.setItem('temp',username);
                    setredirect_state(true);
                }
                else if(response.data.message === "user not found"){
                    setopen(false);
                    setvalidate_username({
                        error_state:true,
                        error_message:"Invalid Username"
                    });
                }
                else{
                    setopen(false);
                    seterror_state(true);
                }
            })
            .catch((err) => {
                setopen(false);
                seterror_state(true);
                console.log(err);
            })
        }
        else{
            setopen(false);
            setvalidate_username({
                error_state:true,
                error_message:"This field is required"
            })
        }
    }
    if(redirect_state){
        return <Redirect to="/Student/ResetPassword" />
    }
    else if(error_state){
        return <Redirect to="/Error" />
    }
    else{
        return (
            <div className="forgot-password-container">
                <Loading open={open}/>
                <img src={wave} className="wave" alt="wave-img"/>
                <div className="forgot-container">
                    <div className="forgot-img-container">
                        <img src={forgotPassword} className="forgot-password-img" alt="forgot password"/>
                    </div>
                    <div className="input-container">
                        <form className="forgot-password-form" onSubmit={handleSubmit}>
                                <img src={logo} alt="logo" className="logo" />
                                <h1>Forgot Password ?</h1>
                                <p className="forgot-password-message">Enter your Registration ID and we will send an OTP to your registered email</p>
                                <div className="login-input">
                                <TextField 
                                    helperText={validate_username.error_message}
                                    error ={validate_username.error_state ? true: false}
                                    id="input-field" 
                                    label="Registration ID"
                                    placeholder="Enter Registration ID"
                                    variant="outlined"
                                    margin="normal"
                                    className = {classes.root}
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                                </div>
                                <input type="submit" className="forgot-password-btn" value="Send OTP" />
                        </form>
                    </div>
                </div>
            </div>
        )
    } 
}

export default ForgotPasswordStudent
