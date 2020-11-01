import React,{useState,useEffect} from 'react'
import { TextField} from "@material-ui/core";
import qs from "qs"
import { Redirect } from 'react-router-dom'
import {useStyles} from "../util.js";
import Loading from "../Pages/Loading.js";
import Axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "../Pages-css/AdminSignup.css"
function AddDepartment() {
    const classes = useStyles();
    const [input_userData,setinput_userData] = useState({id:"",name:"",room:"",hod:""});
    const [buildings, setbuildings] = useState([]);
    const [rooms, setrooms] = useState([]);
    const [building, setbuilding] = useState("");
    const [faculties, setfaculties] = useState([]);
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
        },
        room:{
            errorstate:false,
            message:"" 
        },
        hod:{
            errorstate:false,
            message:"" 
        }
    });
    useEffect(() => {
        getBuildings();
        getFaculties();
    }, []);
    useEffect(() => {
        getRooms();
    }, [building]);
    const getBuildings= async() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/admin/academic',
        };
        const response = await Axios(config);
        console.log(response);
        setbuildings(response.data.data);
    }
    const getRooms= async() => {
        var config = {
            method: 'get',
            url: `http://localhost:3000/admin/building/${building}`,
        };
        const response = await Axios(config);
        console.log(response);
        setrooms(response.data.data.rooms);
    }
    const getFaculties= async() => {
        var config = {
            method: 'get',
            url: `http://localhost:3000/faculty/getAll`,
        };
        const response = await Axios(config);
        console.log(response);
        setfaculties(response.data);
    }
    function handleChange(event){
        const {name,value} = event.target;
        setinput_userData(prevValue=>{
            return{
                ...prevValue,[name]:value
            }
        });
    }
    const handleSelect = (event) => {
        setbuilding(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(input_userData.id.length > 0 && input_userData.name.length > 0 && input_userData.room.length > 0 && input_userData.hod.length > 0){
            setopen(true);
            const data = qs.stringify(input_userData);
            var config = {
                method: 'post',
                url: `http://localhost:3000/admin/department/add`,
                data:data
            };
            Axios(config)
            .then((response) => {
                console.log(response);
                if(response.data.status === "success"){
                    setopen(false);
                    setredirect_state(true);
                }
                else if(response.data.message === "department id taken"){
                    setopen(false);
                    setvalidate((prevValue) => {
                        return {
                            ...prevValue,id:{
                            errorstate:true,
                            message:"Department ID taken"
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
            if(input_userData.room.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,room:{
                        errorstate:true,
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,room:{
                        errorstate:false,
                    }
                    }
                });
            }
            if(input_userData.hod.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,hod:{
                        errorstate:true,
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,hod:{
                        errorstate:false,
                    }
                    }
                });
            }
        }
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        if(redirect_state){
            return <Redirect to="/Admin/Departments" />
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
                            <h4>a new Department</h4>
                            <div className="signup-input-area">
                            <TextField
                              error ={validate.id.errorstate ? true: false}
                              helperText={validate.id.message}
                              id="input-field"
                              label="Department ID"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Department ID"
                              value={input_userData.id}
                              onChange= {handleChange}
                              name="id"
                              className={classes.root}
                            />
                            <TextField
                              error ={validate.name.errorstate ? true: false}
                              helperText={validate.name.message}
                              id="input-field"
                              label="Department Name"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Department Name"
                              value={input_userData.name}
                              onChange= {handleChange}
                              name="name"
                              className = {classes.root}
                            />
                            <FormControl className={classes.root}>
                            <InputLabel id="demo-simple-select-label">Building</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="department-select"
                              name="building"
                              className = {classes.root}
                              value={building}
                              onChange={handleSelect}
                            >
                            {
                                buildings?.map((department) => (
                                    <MenuItem value={department.building_id}>{department.name}</MenuItem>
                                ))
                            }
                            </Select>
                            </FormControl><FormControl className={classes.root}>
                            <InputLabel id="demo-simple-select-label">Room</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="department-select"
                              name="room"
                              className = {classes.root}
                              value={input_userData.room}
                              onChange={handleChange}
                            >
                            {
                                rooms?.map((department) => (
                                    <MenuItem value={department.room_id}>{department.room_id}</MenuItem>
                                ))
                            }
                            </Select>
                            </FormControl>
                            <FormControl className={classes.root}>
                            <InputLabel id="demo-simple-select-label">HOD</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="department-select"
                              name="hod"
                              className = {classes.root}
                              value={input_userData.hod}
                              onChange={handleChange}
                            >
                            {
                                faculties?.map((department) => (
                                    <MenuItem value={department.fac_id}>{department.first_name + " " +  (department.middle_name === null ? "" : department.middle_name + " ") + department.last_name }</MenuItem>
                                ))
                            }
                            </Select>
                            </FormControl>
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

export default AddDepartment
