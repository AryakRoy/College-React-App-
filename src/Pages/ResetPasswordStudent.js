import React,{useState} from 'react'
import {Redirect} from "react-router-dom"
import {useStyles} from "../util.js"
import Axios from "axios"
import qs from "qs"
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Loading from "../Pages/Loading.js"
import wave from "../Images/wave.png"
import logo from "../Images/logo192.png"
import resetPassword from "../Images/reset-password.svg"
import "../Pages-css/ResetPassword.css"
function ResetPasswordStudent() {
    const classes = useStyles();
    const [input_userData, setinput_userData] = useState({
        otp:"",
        password:"",
        confirm_password:""
    });
    const [validate_userData, setvalidate_userData] = useState({
        otp:{
            error_state:false,
            error_message:""
        },
        password:{
            error_state:false,
            error_message:""
        },
        confirm_password:{
            error_state:false,
            error_message:""
        }
    });
    const [open, setopen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [redirect_state, setredirect_state] = useState(false);
    const [error_state,seterror_state] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleChange = (event) => {
        const {name,value} = event.target;
        setinput_userData((prevValue) => {
            return{
                ...prevValue,[name]:value
            }
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setopen(true);
        if(input_userData.otp.length === 6 && input_userData.password === input_userData.confirm_password && input_userData.password.length >=6){
            const data = qs.stringify({
                otp:input_userData.otp,
                new_password: input_userData.password,
            });
            var config = {
                method: 'post',
                url: `http://localhost:3000/student/forgotpassword/${localStorage.getItem('temp')}`,
                data : data,
            };
            Axios(config)
            .then((response) => {
                console.log(response);
                localStorage.removeItem('temp');
                if(response.data.status === "success"){
                    setopen(false);
                    setredirect_state(true);
                }
                else{
                    setopen(false);
                    seterror_state(true);
                }
            })
            .catch((err) => {
                setopen(false);
                console.log(err);
                seterror_state(true);
            })
        }
        else{
            setopen(false);
            if(input_userData.otp.length !== 6){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,otp:{
                        error_state:true,
                        error_message:"OTP should be 6 digit"
                        }
                    }
                });
            }
            else{
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,otp:{
                        error_state:false,
                        error_message:""
                        }
                    }
                });
            }
            if(input_userData.password !== input_userData.confirm_password){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,password:{
                        error_state:true,
                        error_message:"Passwords do not match"
                        }
                    }
                });
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,confirm_password:{
                        error_state:true,
                        error_message:"Passwords do not match"
                        }
                    }
                });
            }
            else{
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,password:{
                        error_state:false,
                        error_message:""
                        }
                    }
                });
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,confirm_password:{
                        error_state:false,
                        error_message:""
                        }
                    }
                });
            }
            if(input_userData.password.length <6){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,password:{
                        error_state:true,
                        error_message:"Minimum length is 6"
                        }
                    }
                });
            }
            else{
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,password:{
                        error_state:false,
                        error_message:""
                        }
                    }
                });
            }
        }
    }
    if(redirect_state){
        return <Redirect to="/Student/Login" />
    }
    else if(error_state){
        return <Redirect to="/Error" />
    }
    else{
        return (
            <div className="reset-password-container">
                <Loading open={open}/>
                <img src={wave} className="wave" alt="wave-img"/>
                <div className="reset-container">
                    <div className="reset-img-container">
                        <img src={resetPassword} className="reset-password-img" alt="reset password"/>
                    </div>
                    <div className="input-container">
                        <form className="reset-password-form" onSubmit={handleSubmit}>
                                <img src={logo} alt="logo" className="logo" />
                                <h1>Reset Password </h1>
                                <p className="reset-password-message">A six digit OTP has been sent on your registered email</p>
                                <div className="login-input">
                                <TextField 
                                    helperText={validate_userData.otp.error_message}
                                    error ={validate_userData.otp.error_state ? true: false}
                                    id="input-field" 
                                    label="OTP"
                                    placeholder="Enter OTP"
                                    variant="outlined"
                                    margin="normal"
                                    className = {classes.root}
                                    name="otp"
                                    value={input_userData.otp}
                                    onChange={handleChange}
                                />
                                <TextField
                                    helperText={validate_userData.password.error_message}
                                    id="input-field1"
                                    label="Password"
                                    error ={validate_userData.password.error_state ? true: false}
                                    variant="outlined"
                                    className = {classes.root}
                                    margin="normal"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    value={input_userData.password}
                                    onChange= {handleChange}
                                    name="password"
                                    InputProps={{endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                     classes={{
                                         root: classes.eyeButton
                                     }}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                     )}}
                                />
                                <TextField
                                    helperText={validate_userData.confirm_password.error_message}
                                    id="input-field1"
                                    label="Confirm Password"
                                    error ={validate_userData.confirm_password.error_state ? true: false}
                                    variant="outlined"
                                    className = {classes.root}
                                    margin="normal"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Confirm Password"
                                    value={input_userData.password}
                                    onChange= {handleChange}
                                    name="confirm_password"
                                    InputProps={{endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                     classes={{
                                         root: classes.eyeButton
                                     }}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    </InputAdornment>
                                     )}}
                                />
                            </div>
                            <input type="submit" className="reset-password-btn" value="Send OTP" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPasswordStudent
