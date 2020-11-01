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
function AddCourse() {
    const classes = useStyles();
    const [input_userData,setinput_userData] = useState({id:"",name:"",preq:"",hod:"",dept:""});
    const [departments, setdepartments] = useState([]);
    const [courses, setcourses] = useState([]);
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
        hod:{
            errorstate:false,
        },
        dept:{
            errorstate:false, 
        }
    });
    useEffect(() => {
        getDepartments();
        getCourses();
    }, []);
    useEffect(() => {
        getFaculties();
    }, [input_userData.dept]);
    const getDepartments= async() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/admin/department',
        };
        const response = await Axios(config);
        console.log(response);
        setdepartments(response.data.data);
    }
    const getCourses= async() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/admin/courses',
        };
        const response = await Axios(config);
        console.log(response);
        setcourses(response.data.data);
    }
    const getFaculties= async() => {
        var config = {
            method: 'get',
            url: `http://localhost:3000/faculty/getAll/${input_userData.dept}`,
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if(input_userData.id.length > 0 && input_userData.name.length > 0 && input_userData.dept.length > 0 && input_userData.hod.length > 0){
            setopen(true);
            const data = qs.stringify(input_userData);
            var config = {
                method: 'post',
                url: `http://localhost:3000/admin/course/add`,
                data:data
            };
            Axios(config)
            .then((response) => {
                console.log(response);
                if(response.data.status === "success"){
                    setopen(false);
                    setredirect_state(true);
                }
                else if(response.data.message === "course id taken"){
                    setopen(false);
                    setvalidate((prevValue) => {
                        return {
                            ...prevValue,id:{
                            errorstate:true,
                            message:"Course ID taken"
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
            if(input_userData.dept.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,dept:{
                        errorstate:true,
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,dept:{
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
            return <Redirect to="/Admin/Courses" />
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
                            <h4>a new Course</h4>
                            <div className="signup-input-area">
                            <TextField
                              error ={validate.id.errorstate ? true: false}
                              helperText={validate.id.message}
                              id="input-field"
                              label="Course ID"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Course ID"
                              value={input_userData.id}
                              onChange= {handleChange}
                              name="id"
                              className={classes.root}
                            />
                            <TextField
                              error ={validate.name.errorstate ? true: false}
                              helperText={validate.name.message}
                              id="input-field"
                              label="Course Name"
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Course Name"
                              value={input_userData.name}
                              onChange= {handleChange}
                              name="name"
                              className = {classes.root}
                            />
                            <FormControl className={classes.root}>
                            <InputLabel id="demo-simple-select-label">Pre Requisite Course</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="department-select"
                              name="preq"
                              className = {classes.root}
                              value={input_userData.preq}
                              onChange={handleChange}
                            >
                            {
                                courses?.map((department) => (
                                    <MenuItem value={department.course_id}>{department.name}</MenuItem>
                                ))
                            }
                            </Select>
                            </FormControl><FormControl className={classes.root}>
                            <InputLabel id="demo-simple-select-label">Dpartment</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="department-select"
                              name="dept"
                              className = {classes.root}
                              value={input_userData.dept}
                              onChange={handleChange}
                            >
                            {
                                departments?.map((department) => (
                                    <MenuItem value={department.dept_id}>{department.name}</MenuItem>
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

export default AddCourse
