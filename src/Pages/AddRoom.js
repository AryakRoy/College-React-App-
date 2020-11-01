import React,{useState} from 'react'
import Axios from "axios"
import qs from "qs"
import { TextField} from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import '../Pages-css/ChangePassword.css'
import {useStyles} from "../util"
function AddRoom({match}) {
    const classes = useStyles();
    const id = match.params.id;
    const [redirect_state, setredirect_state] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [input_userData, setinput_userData] = useState({
        room_id:id,
        room_capacity:""
    });
    const [validate, setvalidate] = useState({
        room_id:{
            error_state:false,
            error_message:""
        },
        room_capacity:{
            error_state:false,
            error_message:"" 
        }
    });
    function handleChange(e) {
        const {name,value} = e.target;
        setinput_userData(prevValue=>{
            return{
                ...prevValue,[name]:value
            }
        });
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(input_userData);
        if(input_userData.room_id.length >0 && input_userData.room_capacity.length >0){
            const senddata= qs.stringify({
                room_id:input_userData.room_id,
                room_capacity:input_userData.room_capacity,
                building_id:id
            });
            var config = {
                method: 'post',
                url: `http://localhost:3000/admin/addRoom`,
                data:senddata
              };
            Axios(config)
            .then((response) => {
                console.log(response);
                if(response.data.status === "success"){
                    setredirect_state(true);
                }
                else if(response.data.message === "room id taken"){
                    setvalidate({
                        room_id:{
                            error_state:true,
                            error_message:"Room ID Taken"
                        },
                        room_capacity:{
                            error_state:false,
                            error_message:"" 
                        }
                    });
                }
                else{
                    seterror_state(true);
                }
            })
            .catch((error) =>{
                console.log(error);
                seterror_state(true);
            })
        }
        else{
            if(input_userData.room_id.length === 0){
                setvalidate((prevValue) => {
                    return{
                        ...prevValue,room_id:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return{
                        ...prevValue,room_id:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(input_userData.room_capacity.length === 0){
                setvalidate((prevValue) => {
                    return{
                        ...prevValue,room_capacity:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate((prevValue) => {
                    return{
                        ...prevValue,room_capacity:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
        }
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        if(redirect_state){
            return <Redirect to={`/Admin/Building/${id}`} />
        }
        else if(error_state){
            return <Redirect to="/Error" />
        }
        else{
            return(
            <div className="container">
                <div className="changepassword-container">
                    <form className="changepassword-form" onSubmit={handleSubmit} autoComplete="off">
                        <h1>Add Room</h1>
                        <div className="otpauth-input-area">
                        <TextField 
                         id="input-field1"
                         error={validate.room_id.error_state?true:false}
                         helperText={validate.room_id.error_message}
                         label="Room ID"
                         variant="outlined"
                         placeholder="Enter Room ID"
                         margin="normal"
                         value={input_userData.room_id}
                         onChange = {handleChange}
                         name="room_id"
                         className={classes.root}
                        />
                        <TextField
                         id="input-field1"
                         error={validate.room_capacity.error_state?true:false}
                         helperText={validate.room_capacity.error_message}
                         label="Room Capacity"
                         variant="outlined"
                         margin="normal"
                         placeholder="Enter Room Capcity"
                         value={input_userData.room_capacity}
                         onChange = {handleChange}
                         className={classes.root}
                         name="room_capacity"
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
        return <Redirect to="/Admin/Login" />
    }
}

export default AddRoom
