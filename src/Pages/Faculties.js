import React, { useState,useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import Backdrop from '@material-ui/core/Backdrop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect,Link } from 'react-router-dom';
import { IconButton } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import "../Pages-css/Student.css"
import {useStyles} from "../util.js"
import Loading from './Loading';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
function Faculties() {
    const classes = useStyles();
    const [faculties, setfaculties] = useState([]);
    const [open, setopen] = useState(false);
    const [delete_id, setdelete_id] = useState("");
    const [remove_student_modal, setremove_student_modal] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [departments, setdepartments] = useState([]);
    const [temp, settemp] = useState("");
    const [temp_dept, settemp_dept] = useState("");
    const handleRemove_modal =() => {
        setremove_student_modal(!remove_student_modal);
    };
    const handleError = () => {
        seterror_state(!error_state);
      };
    useEffect(() => {
        getfaculties();
        getdepartments();
    }, []);
    useEffect(() => {
        getfaculty(temp);
    },[temp]); 
    const getfaculty = async(temp) => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/getAll/${temp}`,
        }; 
        if(temp !== ""){
        const response = await Axios(config);
        console.log(response);
        setfaculties(response.data);
        }
    }
    const getdepartments = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/department`,
          };
        const response = await Axios(config);
        console.log(response);
        setdepartments(response.data.data);
    }
    const getfaculties = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/getAll`,
        };
        const response = await Axios(config);
        console.log(response);
        setfaculties(response.data);
    }
    const deletefaculty = (id) => {
        setopen(false);
        var config = {
            method: "post",
            url: `http://localhost:3000/admin/faculty/remove/${delete_id}`,
        };
        Axios(config)
        .then((response) => {
            console.log(response);
            if(response.data.status === "success"){
                setfaculties((prevValue) =>{
                    return prevValue.filter((faculty) =>{
                        return faculty.fac_id !== delete_id;
                    });
                });
                setopen(false);
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
    const handleSelectChange = (event) => {
        settemp_dept(event.target.value);
        if(event.target.value === "all"){
            getfaculties();
        }
        else{
            settemp(event.target.value);
        }  
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        return (
            <div className="students-container">
            <Loading open={open} />
            <Modal
               className={classes.modal}
               open={error_state}
               onClose={handleError}
               closeAfterTransition
               BackdropComponent={Backdrop}
               BackdropProps={{
                 timeout: 500,
               }}
            >
              <div className={classes.paper}>
                <div className="message error">
                  <div >
                  <HighlightOffIcon className={classes.messageIcon}/>
                  </div>
                  <div >
                    <p>Sorry something went wrong</p>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal
                className={classes.modal}
                open={remove_student_modal}
                onClose={handleRemove_modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
              <div className={classes.paper}>
                <div className="popup">
                  <div className="popup-message">
                  <span>Are you sure you want to remove this Faculty</span>
                  </div>
                  <div className="popup-buttons">
                    <div className="popup-button" onClick={() => {handleRemove_modal();deletefaculty();}}>
                    <span>Yes</span>
                    </div>
                    <div className="popup-button" onClick={() => {setdelete_id("");handleRemove_modal();}}>
                    <span>No</span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
                <div className="students-header">
                  <h1>Faculties</h1>
                </div>
                <div className="students-select">
                <FormControl className={classes.root}>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="programme-select"
                      name="programme"
                      className = {classes.root}
                      value={temp_dept}
                      onChange={handleSelectChange}
                    >
                    <MenuItem value="all">All</MenuItem>
                    {
                        departments?.map((programme) => (
                            <MenuItem value={programme.dept_id}>{programme.name}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                </div>
                <div className="students-main">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Faculty ID</TableCell>
                          <TableCell >Faculty Name</TableCell>
                          <TableCell >Department</TableCell>
                          <TableCell >Email</TableCell>
                          <TableCell>Details</TableCell>
                          <TableCell >Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {faculties.map((student) => (
                          <TableRow key={student.fac_id}>
                            <TableCell component="th">{student.fac_id}</TableCell>
                            <TableCell >{student.first_name + " " +  (student.middle_name === null ? "" : student.middle_name + " ") + student.last_name }</TableCell>
                            <TableCell>{student.department_name}</TableCell>
                            <TableCell>{student.email_id}</TableCell>
                            <TableCell ><Link to={`/Admin/Faculty/${student.fac_id}`}><ArrowForwardIosIcon/></Link></TableCell>
                            <TableCell>
                                <IconButton
                                classes={{
                                    root: classes.eyeButton
                                }}
                                aria-label="toggle password visibility"
                                onClick={() => {setdelete_id(student.fac_id);handleRemove_modal();}}
                                >
                                <DeleteIcon />
                                </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>
        )
    }
    else{
        return <Redirect to="/Admin/Login" />
    }
}

export default Faculties
