import React, { useEffect,useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Redirect,Link} from 'react-router-dom';
import "../Pages-css/Departments.css"
function FacultyClass({match}) {
    const [classData, setclassData] = useState({});
    const [students, setstudents] = useState([]);
    useEffect(() => {
        getclassData();
        getstudents();
    }, []);
    const getclassData = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/getClass/${localStorage.getItem('loggedusername')}/info/${match.params.id}`,
        };
        const response = await Axios(config);
        console.log(response);
        setclassData(response.data.data[0]);
    }
    const getstudents = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/getClass/${localStorage.getItem('loggedusername')}/students/${match.params.id}`,
        };
        const response = await Axios(config);
        console.log(response);
        setstudents(response.data.data); 
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "faculty"){
        return (
            <div className="department-container">
                <div className="department-header">
                    <h1>{classData.section_id}</h1>
                    <div className="department-info">
                      <div className="department-office">
                        <h2>Course</h2>
                        <h6>{classData.course_id}</h6>
                        <h6>{classData.name}</h6>
                      </div>
                      <div className="department-office">
                        <h2>Venue</h2>
                        <h6>{classData.room_id}</h6>
                        <h6>{classData.building_name}</h6>
                      </div>
                      <div className="department-office">
                        <h2>Timing</h2>
                        <h6>{classData.time_slot_id}</h6>
                        <h6>{classData.day}</h6>
                        <h6>{classData.start_time + " - " + classData.end_time}</h6>
                      </div>
                    </div>
                </div>
                <div className="department-main">
                <div className="department-courses">
                <h3>Studnets</h3>
                <div className="department-table">
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Student ID</TableCell>
                          <TableCell >Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Programme</TableCell>
                          <TableCell>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {students?.map((student) => (
                          <TableRow key={student.stud_id}>
                            <TableCell component="th" scope="row">{student.stud_id}</TableCell>
                            <TableCell>{student.first_name + " " + (student.middle_name === null ? "" :student.middle_name + " ") + student.last_name}</TableCell>
                            <TableCell>{student.email_id}</TableCell>
                            <TableCell>{student.phone_no}</TableCell>
                            <TableCell>{student.programme_id}</TableCell>
                            <TableCell><Link to={`/Faculty/Class/${match.params.id}/${student.stud_id}`}><ArrowForwardIosIcon/></Link></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                </div>
                </div>
                </div>
            </div>
        )
    }
    else{
        return <Redirect to="/Faculty/Login" />
    }
}

export default FacultyClass
