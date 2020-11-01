import React,{useState} from 'react'
import { TextField} from "@material-ui/core";
import qs from "qs"
import { Redirect } from 'react-router-dom'
import {useStyles} from "../util.js";
import Loading from "../Pages/Loading.js";
import Axios from 'axios';
import "../Pages-css/AdminSignup.css"
function AddBuilding() {
    const classes = useStyles();
    const [input_userData,setinput_userData] = useState({id:"",name:""});
    const [redirect_state, setredirect_state] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [open, setopen] = useState(false);
    const [validate, setvalidate] = useState({
        id:{
            errorstate:false,
            message:""
        },
        name:{
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
        if(input_userData.id.length >= 0 && input_userData.name.length > 0){
            const data = qs.stringify(input_userData);
            var config = {
                method: 'post',
                url: `http://localhost:3000/admin/building/add`,
                data:data
            };
            Axios(config)
            .then((response) => {
                console.log(response);
                if(response.data.status === "success"){
                    setopen(false);
                    setredirect_state(true);
                }
                else if(response.data.message === "building id taken"){
                    setopen(false);
                    setvalidate((prevValue) => {
                        return {
                            ...prevValue,id:{
                            errorstate:true,
                            message:"Building ID taken"
                        }
                        }
                    });
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
            if(input_userData.id.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,id:{
                        errorstate:true,
                        message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,id:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
            if(input_userData.name.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,name:{
                        errorstate:true,
                        message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,name:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
        }
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        if(redirect_state){
            return <Redirect to="/Admin/Buildings" />
        }
        else if(error_state){
            return <Redirect to="/Error" />
        }
        else{
            return (
                <div className="add-signup-container">
                        <Loading open={open} />
                        <div className="add-container"> 
                            <form onSubmit={handleSubmit} className="signup-form" autoComplete="off" >
                            <h1>Add</h1>
                            <h4>a new Building</h4>
                            <div className="signup-input-area">
                            <TextField
                              error ={validate.id.errorstate ? true: false}
                              helperText={validate.id.message}
                              id="input-field"
                              label="Building ID"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Building ID"
                              value={input_userData.id}
                              onChange= {handleChange}
                              name="id"
                              className={classes.root}
                            />
                            <TextField
                              error ={validate.name.errorstate ? true: false}
                              helperText={validate.name.message}
                              id="input-field"
                              label="Building Name"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Building Name"
                              value={input_userData.name}
                              onChange= {handleChange}
                              name="name"
                              className = {classes.root}
                            />
                            </div>
                            <input className="signup-btn" value="Add"  type="submit" />
                            </form>
                        </div>
                    </div>
            )
        }
    }
    else{
        return <Redirect to="/Admin/Login" />
    }
}

export default AddBuilding
