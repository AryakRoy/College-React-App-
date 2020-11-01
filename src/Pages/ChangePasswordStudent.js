import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Axios from 'axios';
import qs from "qs";
import React,{useState} from 'react'
import { Redirect } from 'react-router-dom';
import '../Pages-css/ChangePassword.css'
import {useStyles} from "../util.js"
import Loading from "../Pages/Loading.js";
function ChangePasswordStudent() {
    const classes = useStyles();
    const [input_userData, setinput_userData] = useState({password:"",new_password:"",confirm_password:""});
    const [validate_userData, setvalidate_userData] = useState({
        password:{
            error_state:false,
            error_message:""
        },
        new_password:{
            error_state:false,
            error_message:""
        },
        confirm_password:{
            error_state:false,
            error_message:""
        }
    });
    const [redirect_state, setredirect_state] = useState(false);
    const [open, setopen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    function handleChange(e) {
        const {name,value} = e.target;
        setinput_userData(prevValue=>{
            return{
                ...prevValue,[name]:value
            }
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setopen(true);
        if(input_userData.new_password === input_userData.confirm_password && input_userData.password !== input_userData.new_password && input_userData.new_password.length >= 6){
            const senddata= qs.stringify({
                password:input_userData.password,
                new_password:input_userData.new_password
            });
            var config = {
                method: 'post',
                url: `http://localhost:3000/student/changepassword/${localStorage.getItem('loggedusername')}`,
                data:senddata
              };
            Axios(config)
            .then((response) => {
                console.log(JSON.stringify(response));
                setopen(false);
                if(response.data.status === "success"){
                    setredirect_state(true);
                }
                else if(response.data.message === "incorrect old password"){
                    setvalidate_userData((prevValue) => {
                        return{
                            ...prevValue,password:{
                                error_state:true,
                                error_message:"Incorrect Password"
                            }
                        }
                    });
                }
            })
            .catch((error) =>{
                console.log(error);
            })
        }
        else{
            if(input_userData.new_password === input_userData.password){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return{
                        ...prevValue,password:{
                            error_state:true,
                            error_message:"Passwords do not match"
                        }
                    }
                });
                setvalidate_userData((prevValue) => {
                    return{
                        ...prevValue,new_password:{
                            error_state:true,
                            error_message:"Passwords do not match"
                        }
                    }
                });
            }
            else{
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return{
                        ...prevValue,password:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
                setvalidate_userData((prevValue) => {
                    return{
                        ...prevValue,new_password:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(input_userData.new_password !== input_userData.confirm_password){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return{
                        ...prevValue,new_password:{
                            error_state:true,
                            error_message:"Passwords do not match"
                        }
                    }
                });
                setvalidate_userData((prevValue) => {
                    return{
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
                    return{
                        ...prevValue,password:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
                setvalidate_userData((prevValue) => {
                    return{
                        ...prevValue,new_password:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(input_userData.new_password.length < 6){
                setopen(false);
                setvalidate_userData((prevValue) => {
                    return{
                        ...prevValue,new_password:{
                            error_state:true,
                            error_message:"Minimum length is 6"
                        }
                    }
                });
            }
            else{
                setvalidate_userData((prevValue) => {
                    setopen(false);
                    return{
                        ...prevValue,new_password:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
        }
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "student"){
        if(redirect_state){
            return <Redirect to="/Student/Dashboard" />
        }
        else{
            return (
                <div className="container">
                {open ? <Loading open={open}/>: null}
                <div className="changepassword-container">
                    <form className="changepassword-form" onSubmit={handleSubmit} autoComplete="off">
                        <h1>Change Password</h1>
                        <div className="otpauth-input-area">
                        <TextField 
                         id="input-field1"
                         error={validate_userData.password.error_state?true:false}
                         helperText={validate_userData.password.error_message}
                         type={showPassword ? "text" : "password"}
                         label="Old Password"
                         variant="outlined"
                         placeholder="Enter Old Password"
                         margin="normal"
                         value={input_userData.password}
                         onChange = {handleChange}
                         name="password"
                         className={classes.root}
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
                         id="input-field1"
                         error={validate_userData.new_password.error_state?true:false}
                         helperText={validate_userData.new_password.error_message}
                         type={showPassword ? "text" : "password"}
                         label="Enter Password"
                         variant="outlined"
                         placeholder="Enter New Password"
                         margin="normal"
                         value={input_userData.new_password}
                         className={classes.root}
                         onChange = {handleChange}
                         name="new_password"
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
                         id="input-field1"
                         error={validate_userData.confirm_password.error_state?true:false}
                         helperText={validate_userData.confirm_password.error_message}
                         type={showPassword ? "text" : "password"}
                         label="Confirm New Password"
                         variant="outlined"
                         margin="normal"
                         placeholder="Confirm New Password"
                         value={input_userData.confirm_password}
                         onChange = {handleChange}
                         className={classes.root}
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
                        <input className="changepassword-btn" type="submit" value="Submit" /> 
                    </form>
                </div>
                </div>
            )
        }
    }
    else{
       return  <Redirect to="/Student/Login" />
    }
}

export default ChangePasswordStudent
