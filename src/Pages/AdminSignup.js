import React from 'react'
import '../Pages-css/AdminSignup.css'
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useState} from "react"
import qs from "qs"
import { Redirect } from 'react-router-dom'
import {useStyles} from "../util.js";
import Loading from "../Pages/Loading.js";
import Axios from 'axios';
function AdminSignup() {
    const classes = useStyles();
    const [input_userData,setinput_userData] = useState({admin_id:"",email:"",first_name:"",middle_name:"",last_name:"",password:"",confirm_password:""});
    const [redirect_state, setredirect_state] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [error_state, seterror_state] = useState(false);
    const [open, setopen] = useState(false);
    const [validate, setvalidate] = useState({
        first_name:{
            errorstate:false,
            message:""
        },
        last_name:{
            errorstate:false,
            message:""
        },
        admin_id:{
            errorstate:false,
            message:""
        },
        email:{
            errorstate:false,
            message:""
        },
        password:{
            errorstate:false,
            message:""
        },
        confirm_password:{
            errorstate:false,
            message:""
        }
    });
    function handleChange(event){
        const {name,value} = event.target;
        setinput_userData(prevValue=>{
            return{
                ...prevValue,[name]:value
            }
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setopen(true);
        if(input_userData.first_name.length >0 && input_userData.last_name.length >0 && input_userData.email.length>0 && input_userData.admin_id.length>0 && input_userData.password === input_userData.confirm_password && input_userData.password.length >= 6){
            
            const senddata = qs.stringify({
                admin_id:input_userData.admin_id,
                first_name:input_userData.first_name,
                middle_name:input_userData.middle_name,
                last_name:input_userData.last_name,
                email:input_userData.email,
                password:input_userData.password
            });
            var config = {
                method: 'post',
                url: `http://localhost:3000/admin/register`,
                data:senddata
            };
            console.log(senddata);
            Axios(config)
            .then((response) => {
                console.log(response);
                setopen(false);
                if(response.data.status === "success"){
                    localStorage.setItem('loggedusername',input_userData.admin_id);
                    localStorage.setItem('isLogged',true);
                    localStorage.setItem('loggeduser',"admin");
                    setopen(false);
                    setredirect_state(true);
                }
                else if (response.data.message === "user id taken"){
                    setopen(false);
                    setvalidate({
                        first_name:{
                            errorstate:false,
                            message:""
                        },
                        last_name:{
                            errorstate:false,
                            message:""
                        },
                        admin_id:{
                            errorstate:true,
                            message:"User ID taken"
                        },
                        email:{
                            errorstate:false,
                            message:""
                        },
                        password:{
                            errorstate:false,
                            message:""
                        },
                        confirm_password:{
                            errorstate:false,
                            message:""
                        }
                    })
                }
                else if (response.data.message === "failure"){
                    setopen(false);
                    seterror_state(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            setopen(false);
            if(input_userData.admin_id.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,admin_id:{
                        errorstate:true,
                        message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,admin_id:{
                        errorstate:false,
                        message:""
                    }
                    }
                }); 
            }
            if(input_userData.first_name.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,first_name:{
                        errorstate:true,
                        message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,first_name:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
            if(input_userData.last_name.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,last_name:{
                        errorstate:true,
                        message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,last_name:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
            if(input_userData.email.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,email:{
                        errorstate:true,
                        message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,email:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
            if(input_userData.password !== input_userData.confirm_password){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,password:{
                        errorstate:true,
                        message:"Passwords do not match"
                    }
                    }
                });
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,confirm_password:{
                        errorstate:true,
                        message:"Passwords do not match"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,password:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,confirm_password:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
            if(input_userData.password.length < 6){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,password:{
                        errorstate:true,
                        message:"Minimum 6 characters"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,password:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
        }
    }
    if(localStorage.getItem('isLogged')){
        return <Redirect to="/Admin/Dashboard" />
    }
    else{
        if(redirect_state){
            return <Redirect to="/Admin/Dashboard" />
        }
        else if(error_state){
            return <Redirect to="/Error" />
        }
        else{
            return (
                <div className="admin-signup-container">
                    {open ? <Loading open={open}/>: null}
                        <div className="signup-container"> 
                            <form onSubmit={handleSubmit} className="signup-form" autoComplete="off" >
                            <h1>Welcome</h1>
                            <h4>Let's get you started</h4>
                            <div className="signup-input-area">
                            <TextField
                              error ={validate.admin_id.errorstate ? true: false}
                              helperText={validate.admin_id.message}
                              id="input-field"
                              label="Admin ID"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Admin ID"
                              value={input_userData.admin_id}
                              onChange= {handleChange}
                              name="admin_id"
                              className={classes.root}
                            />
                            <TextField
                              error ={validate.first_name.errorstate ? true: false}
                              helperText={validate.first_name.message}
                              id="input-field"
                              label="First Name"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter First Name"
                              value={input_userData.first_name}
                              onChange= {handleChange}
                              name="first_name"
                              className = {classes.root}
                            />
                            <TextField
                              id="input-field"
                              label="Middle Name"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Middle Name"
                              value={input_userData.middle_name}
                              onChange= {handleChange}
                              name="middle_name"
                              className = {classes.root}
                            />
                            <TextField
                              error ={validate.last_name.errorstate ? true: false}
                              helperText={validate.last_name.message}
                              id="input-field"
                              label="Last Name"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Last Name"
                              value={input_userData.last_name}
                              onChange= {handleChange}
                              name="last_name"
                              className = {classes.root}
                            />
                           <TextField
                             error ={validate.email.errorstate ? true: false}
                             helperText={validate.email.message}
                             id="input-field"
                             type="email"
                             label="Email"
                             placeholder="Enter Email"
                             variant="outlined"
                             margin="normal"
                             value={input_userData.email}
                             onChange = {handleChange}
                             name="email"
                             className={classes.root}
                           />
                           <TextField
                           error ={validate.password.errorstate ? true: false}
                             helperText={validate.password.message}
                         id="input-field1"
                         type={showPassword ? "text" : "password"}
                         label="Enter Password"
                         variant="outlined"
                         placeholder="Enter New Password"
                         margin="normal"
                         value={input_userData.password}
                         className={classes.root}
                         onChange = {handleChange}
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
                        error ={validate.confirm_password.errorstate ? true: false}
                             helperText={validate.confirm_password.message}
                         id="input-field1"
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
                            <input className="signup-btn" value="Register"  type="submit" />
                            </form>
                        </div>
                    </div>
            )
        }
    }
}

export default AdminSignup
