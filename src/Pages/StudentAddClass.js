import React, { useEffect,useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Axios from "axios";
import { Redirect} from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useStyles} from "../util"
import "../Pages-css/Departments.css"
function StudentAddClass() {
    const classess = useStyles();
    const [classes, setclasses] = useState([]);
    const [courses, setcourses] = useState([]);
    const [error_state, seterror_state] = useState(false);
    const [redirect_state, setredirect_state] = useState(false);
    const [tempcourse, settempcourse] = useState("");
    const [course, setcourse] = useState("");
    const [section, setsection] = useState("");
    const [remove_student_modal, setremove_student_modal] = useState(false);
    const handleRemove_modal =() => {
        setremove_student_modal(!remove_student_modal);
    };
    const handleError = () => {
        seterror_state(!error_state);
      };
    useEffect(() => {
        getclasses();
        getcourses();
    }, []);
    useEffect(() => {
        getclasse();
    }, [course]);
    const getcourses = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/courses`,
        };
        const response = await Axios(config);
        console.log(response);
        setcourses(response.data.data);
    }
    const getclasse = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/student/${localStorage.getItem('loggedusername')}/getcoursefaculties/${course}`,
        };
        const response = await Axios(config);
        console.log(response);
        setclasses(response.data.data);
    }
    const getclasses = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/student/${localStorage.getItem('loggedusername')}/getcoursefaculties`,
        };
        const response = await Axios(config);
        console.log(response);
        setclasses(response.data.data);
    }
    const handleSelectChange = (event) => {
        settempcourse(event.target.value);
        if(event.target.value === "all"){
            getclasses();
        }
        else{
            setcourse(event.target.value);
        }  
    }
    const addClass = () => {
        var config = {
            method: "post",
            url: `http://localhost:3000/student/${localStorage.getItem('loggedusername')}/addClass/${section}`,
        }; 
        Axios(config)
        .then((response) => {
            console.log(response);
            if(response.data.status === "success"){
                setredirect_state(true);
            }
            else{
                seterror_state(true);
            }
        })
        .catch((err) => {
            console.log(err);
            seterror_state(true);
        })
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "student"){
        if(redirect_state){
            return <Redirect to="/Student/Classes" />
        }
        else{
            return (
                <div className="students-container">
                <Modal
                   className={classess.modal}
                   open={error_state}
                   onClose={handleError}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{
                     timeout: 500,
                   }}
                >
                  <div className={classess.paper}>
                    <div className="message error">
                      <div >
                      <HighlightOffIcon className={classess.messageIcon}/>
                      </div>
                      <div >
                        <p>Sorry something went wrong</p>
                      </div>
                    </div>
                  </div>
                </Modal>
                <Modal
                    className={classess.modal}
                    open={remove_student_modal}
                    onClose={handleRemove_modal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                  <div className={classess.paper}>
                    <div className="popup">
                      <div className="popup-message">
                      <span>Are you sure you want to Add this Class</span>
                      </div>
                      <div className="popup-buttons">
                        <div className="popup-button" onClick={() => {handleRemove_modal();addClass();}}>
                        <span>Yes</span>
                        </div>
                        <div className="popup-button" onClick={() => {setsection("");handleRemove_modal();}}>
                        <span>No</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                    <div className="students-header">
                      <h1>Add a New Class</h1>
                    </div>
                    <div className="students-select">
                    <FormControl className={classess.root}>
                        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="programme-select"
                          name="programme"
                          className = {classess.root}
                          value={tempcourse}
                          onChange={handleSelectChange}
                        >
                        <MenuItem value="all">All</MenuItem>
                        {
                            courses?.map((course) => (
                                <MenuItem value={course.course_id}>{course.name}</MenuItem>
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
                              <TableCell>Section ID</TableCell>
                              <TableCell >Course</TableCell>
                              <TableCell >Faculty</TableCell>
                              <TableCell >Venue</TableCell>
                              <TableCell>Timings</TableCell>
                              <TableCell >Add</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {classes.map((student) => (
                              <TableRow key={student.section_id}>
                                <TableCell component="th">{student.section_id}</TableCell>
                                <TableCell>{student.course_id + " " + student.course_name}</TableCell>
                                <TableCell >{student.fac_id + " " + student.first_name + " " +  (student.middle_name === null ? "" : student.middle_name + " ") + student.last_name }</TableCell>
                                <TableCell>{student.room_id + " " + student.name}</TableCell>
                                <TableCell>{student.day + " " + student.start_time + " - " + student.end_time}</TableCell>
                                <TableCell>
                                    <IconButton
                                    classes={{
                                        root: classess.eyeButton
                                    }}
                                    aria-label="toggle password visibility"
                                    onClick={() => {setsection(student.section_id);handleRemove_modal();}}
                                    >
                                    <AddIcon />
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
    }
    else{
        return <Redirect to="/Student/Login" />
    }
}

export default StudentAddClass
