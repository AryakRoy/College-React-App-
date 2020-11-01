import React, { useEffect,useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Redirect,Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import "../Pages-css/Student.css"
function StudentClasses() {
    const [studentClasses, setstudentClasses] = useState([]);
    useEffect(() => {
        getstudentClasses();
    }, []);
    const getstudentClasses = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/student/getClass/${localStorage.getItem('loggedusername')}`,
          };
        const response = await Axios(config);
        console.log(response);
        setstudentClasses(response.data.data);
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "student"){
        return (
            <div className="student-page-container"> 
                <div className="students-header">
                <h3>Classes</h3>
                <Link to="/Student/Add/Class">
                <Tooltip title="Add" aria-label="add">
                <Fab
                style={{
                    backgroundColor:'#1fab89',
                    color:'#eeeeee',
                }}
                >
                <AddIcon />
                </Fab>
                </Tooltip>
                </Link>
                </div>
                <div className="students-main">
                <div className="student-table">
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Section ID</TableCell>
                          <TableCell >Course</TableCell>
                          <TableCell>Faculty ID</TableCell>
                          <TableCell>Faculty Name</TableCell>
                          <TableCell>Venue</TableCell>
                          <TableCell>Day</TableCell>
                          <TableCell>Start Time</TableCell>
                          <TableCell>End Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentClasses?.map((student) => (
                          <TableRow key={student.sec_id}>
                            <TableCell component="th" scope="row">{student.sec_id}</TableCell>
                            <TableCell>{student.course_id + " " + student.course_name}</TableCell>
                            <TableCell>{student.fac_id}</TableCell>
                            <TableCell>{student.first_name + " " + (student.middle_name === null ? "" :student.middle_name + " ") + student.last_name}</TableCell>
                            <TableCell>{student.room_id + " " + student.building_name}</TableCell>
                            <TableCell>{student.day}</TableCell>
                            <TableCell>{student.start_time}</TableCell>
                            <TableCell>{student.end_time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                </div>
                </div>
            </div>
        )
    }
    else{
        return <Redirect to="/Student/Login" />
    }
}

export default StudentClasses
