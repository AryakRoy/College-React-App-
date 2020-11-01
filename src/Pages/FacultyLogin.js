import React,{useState} from 'react'
import {Link, Redirect} from "react-router-dom"
import {useStyles} from "../util.js"
import Axios from "axios"
import qs from "qs"
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Loading from "../Pages/Loading.js"
import "../Pages-css/StudentLogin.css"
import wave from "../Images/wave.png"
import logo from "../Images/logo192.png"
import facultyLogin from "../Images/professor-login.svg"
import "../Pages-css/FacultyLogin.css"
function FacultyLogin() {
    const classes = useStyles();
    const [open, setopen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [redirect_state, setredirect_state] = useState(false);
    const [error_state,seterror_state] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [input_userData, setinput_userData] = useState({
        faculty_id:"",
        password:""
    });
    const [validate_userData, setvalidate_userData] = useState({
        faculty_id:{
            error_state:false,
            error_message:""
        },
        password:{
            error_state:false,
            error_message:""
        }
    });
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
        if(input_userData.faculty_id.length > 0 && input_userData.password.length>0){
            const senddata = qs.stringify({
                id:input_userData.faculty_id,
                password:input_userData.password
            });
            console.log(senddata);
            var config = {
                method: 'post',
                url: 'http://localhost:3000/faculty/login',
                data : senddata,
            };
            Axios(config)
            .then((response) => {
                console.log(response);
                if(response.data.status === "success"){
                    localStorage.setItem('loggedusername',input_userData.faculty_id);
                    localStorage.setItem('isLogged',true);
                    localStorage.setItem('loggeduser',"faculty");
                    setopen(false);
                    setredirect_state(true);
                }
                else{
                    if(response.data.message === "faculty not found"){
                        setopen(false);
                        setvalidate_userData({
                            faculty_id:{
                                error_state:true,
                                error_message:"User Not Found"
                            },
                            password:{
                                error_state:false,
                                error_message:""
                            } 
                        });
                    }
                    else if(response.data.message === "incorrect password"){
                        setopen(false);
                        setvalidate_userData({
                            faculty_id:{
                                error_state:false,
                                error_message:""
                            },
                            password:{
                                error_state:true,
                                error_message:"Incorrect Password"
                            } 
                        });
                    }
                    else{
                        setopen(false);
                        seterror_state(true);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                setopen(false);
                seterror_state(true);
            })
        }
        else{
            if(input_userData.faculty_id.length === 0){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,faculty_id:{
                        error_state:true,
                        error_message:"This field is required"
                    }
                    }
                });
            }
            if(input_userData.password.length === 0){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return {
                        ...prevValue,password:{
                        error_state:true,
                        error_message:"This field is required"
                    }
                    }
                });
            }
        }
    }
    if(localStorage.getItem('isLogged')){
        if(localStorage.getItem('loggeduser') === "student"){
            return <Redirect to="/Student/Dashboard" />
        }
        else if(localStorage.getItem('loggeduser') === "faculty"){
            return <Redirect to="/Faculty/Dashboard" />
        }
        else if(localStorage.getItem('loggeduser') === "admin"){
            return <Redirect to="/Admin/Dashboard" />
        }
    }
    else{
    if(redirect_state){
        return <Redirect to="/Student/Dashboard" />
    }
    else if(error_state){
        return <Redirect to="/Error" />
    }
    else{
        return (
            <div className="student-login-container">
                {open ? <Loading open={open}/>: null}
                <img src={wave} className="wave" alt="wave-img"/>
                <div className="student-container">
                    <div className="student-img-container">
                        <img src={facultyLogin} className="student-login-img" alt="student login"/>
                    </div>
                    <div className="login-container">
                        <form className="student-login-form" onSubmit={handleSubmit}>
                            <img src={logo} alt="logo" className="logo" />
                            <h1>Hey There</h1>
                            <Link to="/Student/Login"><p>Student ?</p></Link>
                            <div className="login-input">
                            <TextField 
                                helperText={validate_userData.faculty_id.error_message}
                                error ={validate_userData.faculty_id.error_state ? true: false}
                                id="input-field" 
                                label="Faculty ID"
                                placeholder="Enter Faculty ID"
                                variant="outlined"
                                margin="normal"
                                className = {classes.root}
                                name="faculty_id"
                                value={input_userData.faculty_id}
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
                            </div>
                            <div className="login-links">
                                <Link to="/Faculty/Signup"><span>Create an account</span></Link>
                                <Link to="/Faculty/ForgotPassword"><span>Forgot Password</span></Link>
                            </div>
                            <input type="submit" className="login-btn" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    }
}

export default FacultyLogin
