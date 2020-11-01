import React, { useState,useEffect } from 'react'
import { useStyles } from '../util'
import Axios from "axios";
import qs from "qs";
import { TextField} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Redirect} from "react-router-dom"
import '../Pages-css/ChangePassword.css'
function FacultyAddClass() {
    const classes = useStyles();
    const [courses, setcourses] = useState([]);
    const [times, settimes] = useState([]);
    const [buildings, setbuildings] = useState([]);
    const [rooms, setrooms] = useState([]);
    const [error_state, seterror_state] = useState(false);
    const [redirect_state, setredirect_state] = useState(false);
    const [input_userData, setinput_userData] = useState({
        section:"",
        course:"",
        day:"",
        time:"",
        building:"",
        room:""
    });
    const [validate, setvalidate] = useState({
        section:{
            errorstate:false,
            message:""
        },
        course:{
            errorstate:false
        },
        day:{
            errorstate:false
        },
        time:{
            errorstate:false
        },
        building:{
            errorstate:false
        },
        room:{
            errorstate:false
        }
    });
    useEffect(() => {
        getCourses();
    }, []);
    useEffect(() => {
        getTimes();
    }, [input_userData.day]);
    useEffect(() => {
        getBuildings();
    }, [input_userData.time]);
    useEffect(() => {
        getRooms();
    }, [input_userData.building]);
    const getCourses = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/${localStorage.getItem('loggedusername')}/getCourses`,
          };
        const response = await Axios(config);
        console.log(response);
        setcourses(response.data.data);
    }
    const getBuildings = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/academic`,
          };
        const response = await Axios(config);
        console.log(response);
        setbuildings(response.data.data);
    }
    const getTimes = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/${localStorage.getItem('loggedusername')}/getTime/${input_userData.day}`,
          };
        const response = await Axios(config);
        console.log(response);
        settimes(response.data.data);
    }
    const getRooms = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/${localStorage.getItem('loggedusername')}/getRoom/${input_userData.time}/${input_userData.building}`,
          };
        const response = await Axios(config);
        console.log(response);
        setrooms(response.data.data);
    }
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
        if(input_userData.section.length === 15 && input_userData.course.length > 0 && input_userData.day.length>0 && input_userData.time.length>0 && input_userData.building.length >0 && input_userData.room.length>0){
            const data = qs.stringify(input_userData);
            var config = {
                method: "post",
                url: `http://localhost:3000/faculty/${localStorage.getItem('loggedusername')}/addClass`,
                data:data
            };
            Axios(config)
            .then((response) => {
                console.log(response);
                if(response.data.status === "success"){
                    setredirect_state(true);
                }
                else if(response.data.message === "section id taken"){
                    setvalidate({
                        section:{
                            errorstate:true,
                            message:"Section ID taken"
                        },
                        course:{
                            errorstate:false
                        },
                        day:{
                            errorstate:false
                        },
                        time:{
                            errorstate:false
                        },
                        building:{
                            errorstate:false
                        },
                        room:{
                            errorstate:false
                        }
                    });
                }
                else{
                    seterror_state(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            if(input_userData.section.length !== 15){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,section:{
                        errorstate:true,
                        message:"Section ID should be 15 characters"
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,section:{
                        errorstate:false,
                        message:""
                    }
                    }
                });
            }
            if(input_userData.course.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,course:{
                        errorstate:true,
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,course:{
                        errorstate:false,
                    }
                    }
                });
            }
            if(input_userData.day.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,day:{
                        errorstate:true,
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,day:{
                        errorstate:false,
                    }
                    }
                });
            }
            if(input_userData.time.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,time:{
                        errorstate:true,
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,time:{
                        errorstate:true,
                    }
                    }
                });
            }
            if(input_userData.building.length === 0){
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,building:{
                        errorstate:true,
                    }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return {
                        ...prevValue,building:{
                        errorstate:true,
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
                        errorstate:true,
                    }
                    }
                });
            }
        }
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "faculty"){
        if(redirect_state){
            return <Redirect to="/Faculty/Classes" />
        }
        else if(error_state){
            return <Redirect to="/Error" />
        }
        else{
            return (
                <div className="container">
                <div className="changepassword-container">
                    <form className="changepassword-form" onSubmit={handleSubmit} autoComplete="off">
                        <h1>Change Password</h1>
                        <div className="otpauth-input-area">
                        <TextField 
                         id="input-field"
                         error={validate.section.error_state?true:false}
                         helperText={validate.section.error_message}
                         label="Section ID"
                         variant="outlined"
                         placeholder="Enter Section ID"
                         margin="normal"
                         value={input_userData.section}
                         onChange = {handleChange}
                         name="section"
                         className={classes.root}
                        />
                        <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Course</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="select"
                          name="course"
                          value={input_userData.course}
                          onChange={handleChange}
                          error={validate.course.errorstate?true:false}
                        >
                          {
                            courses?.map((course) => (
                             <MenuItem value={course.course_id}>{course.name}</MenuItem>
                            ))
                          }
                        </Select>
                        </FormControl>
                        <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Day</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="select"
                          name="day"
                          error ={validate.day.error_state ? true: false} 
                          value={input_userData.day}
                          onChange={handleChange}
                        >
                          <MenuItem value={"Monday"}>Monday</MenuItem>
                          <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                          <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                          <MenuItem value={"Thursday"}>Thursday</MenuItem>
                          <MenuItem value={"Friday"}>Friday</MenuItem>
                        </Select>
                    </FormControl>
                        <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Time</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="select"
                          name="time"
                          value={input_userData.time}
                          onChange={handleChange}
                          error={validate.time.errorstate?true:false}
                        >
                          {
                            times?.map((time) => (
                             <MenuItem value={time.time_slot_id}>{time.start_time + " - " + time.end_time}</MenuItem>
                            ))
                          }
                        </Select>
                        </FormControl>
                        <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Building</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="select"
                          name="building"
                          value={input_userData.building}
                          onChange={handleChange}
                          error={validate.building.errorstate?true:false}
                        >
                          {
                            buildings?.map((building) => (
                             <MenuItem value={building.building_id}>{building.name}</MenuItem>
                            ))
                          }
                        </Select>
                        </FormControl>
                        <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Room</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="select"
                          name="room"
                          value={input_userData.room}
                          onChange={handleChange}
                          error={validate.room.errorstate?true:false}
                        >
                          {
                            rooms?.map((room) => (
                             <MenuItem value={room.room_id}>{room.room_id}</MenuItem>
                            ))
                          }
                        </Select>
                        </FormControl>
                        </div>
                        <input className="changepassword-btn" type="submit" value="Submit" /> 
                    </form>
                </div>
                </div>
            )
        }
    }
    else{
       return  <Redirect to="/Faculty/Login" />
    }
}

export default FacultyAddClass
