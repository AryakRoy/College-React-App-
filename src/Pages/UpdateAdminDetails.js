import React,{useState,useContext,useEffect}from 'react'
import '../Pages-css/AdminSignup.css'
import { TextField} from "@material-ui/core";
import qs from "qs"
import { Redirect } from 'react-router-dom'
import {useStyles} from "../util.js";
import Loading from "../Pages/Loading.js";
import Axios from 'axios';
import {UserContext} from "../App.js"
function UpdateAdminDetails() {
    const classes = useStyles();
    const adminData = useContext(UserContext).admin[0];
    const names = adminData.name.split(" ");
    const [input_userData,setinput_userData] = useState({email:"",first_name:"",middle_name:"",last_name:""});
    useEffect(() => {
    assign();
    }, []);
    const assign = () => {
        if(names.length === 3){
            setinput_userData({
                email:adminData.email,
                first_name:names[0],
                middle_name:"",
                last_name:names[1]
            });
        } 
        else if(names.length === 2)
        {
            setinput_userData({
                email:adminData.email,
                first_name:names[0],
                middle_name:"",
                last_name:names[1]
            })
        }
    }
    const [redirect_state, setredirect_state] = useState(false);
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
        email:{
            errorstate:false,
            message:""
        },
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
        if(input_userData.first_name.length >0 && input_userData.last_name.length >0 && input_userData.email.length>0){
            const data = qs.stringify({
                first_name: input_userData.first_name,
                middle_name:input_userData.middle_name,
                last_name:input_userData.last_name,
                email:input_userData.email
            })
            var config = {
                method: 'post',
                url: `http://localhost:3000/admin/updateadmindetails/${localStorage.getItem('loggedusername')}`,
                data:data
            };
            Axios(config)
            .then((response) => {
                console.log(response);
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
                console.log(err);
                setopen(false);
                seterror_state(true);
            })
        }
        else{
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
        }
    }
    if(!localStorage.getItem('isLogged')){
        return <Redirect to="/Admin/Login" />
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
                            <form  className="signup-form" onSubmit={handleSubmit} autoComplete="off" >
                            <h1>Update</h1>
                            <h4>Admin Details</h4>
                            <div className="signup-input-area">
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
                            </div>
                            <input className="signup-btn" value="Update"  type="submit" />
                            </form>
                        </div>
                    </div>
            )
        }
    }
}

export default UpdateAdminDetails
