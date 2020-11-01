import React, { useEffect,useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Redirect,Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import "../Pages-css/Student.css"
function FacultyClasses() {
    const [studentClasses, setstudentClasses] = useState([]);
    useEffect(() => {
        getstudentClasses();
    }, []);
    const getstudentClasses = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/getClass/${localStorage.getItem('loggedusername')}`,
          };
        const response = await Axios(config);
        console.log(response);
        setstudentClasses(response.data.data);
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "faculty"){
        return (
                <div className="student-page-container">
                <div className="students-header">
                <h3>Classes</h3>
                <Link to="/Faculty/Add/Class">
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
                          <TableCell>Venue</TableCell>
                          <TableCell>Day</TableCell>
                          <TableCell>Start Time</TableCell>
                          <TableCell>End Time</TableCell>
                          <TableCell>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentClasses?.map((student) => (
                          <TableRow key={student.section_id}>
                            <TableCell component="th" scope="row">{student.section_id}</TableCell>
                            <TableCell>{student.course_id + " " + student.name}</TableCell>
                            <TableCell>{student.room_id + " " + student.building_name}</TableCell>
                            <TableCell>{student.day}</TableCell>
                            <TableCell>{student.start_time}</TableCell>
                            <TableCell>{student.end_time}</TableCell>
                            <TableCell><Link to={`/Faculty/Class/${student.section_id}`}><ArrowForwardIosIcon/></Link></TableCell>
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
        return <Redirect to="/Admin/Login" />
    }
}

export default FacultyClasses
