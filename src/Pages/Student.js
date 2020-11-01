import React, { useEffect,useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import { Redirect} from 'react-router-dom';
import "../Pages-css/Student.css"
function Student({match}) {
    const id = match.params.id;
    const [studentData, setstudentData] = useState([]);
    const [studentClasses, setstudentClasses] = useState([]);
    useEffect(() => {
        getstudentData();
        getstudentClasses();
    }, []);
    const getstudentData = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/student/get/${id}`,
          };
        const response = await Axios(config);
        console.log(response);
        setstudentData(response.data.data);
    }
    const getstudentClasses = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/student/getClass/${id}`,
          };
        const response = await Axios(config);
        console.log(response);
        setstudentClasses(response.data.data);
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        return (
            <div className="student-page-container">
                <div className="student-page-header">
                    <h1>{studentData.id} {studentData.name}</h1>
                    <div className="student-page-info">
                      <div className="student-page-details">
                      <h2>Details</h2>
                      <h6>{studentData.email}</h6>
                      <h6>{studentData.phone}</h6>
                      <h6>{studentData.sex === "M" ? "Male" : "Female"}</h6>
                      <h6>Date Of Birth: {studentData.dob}</h6>
                      <h6>Blood Group: {studentData.bloog_group}</h6>
                      {studentData.proctor_id ? <h6>Proctor: {studentData.proctor_id} {studentData.proctor_name}</h6> : null}
                      <h6>Programme: {studentData.programme}</h6>
                      <h6>Department: {studentData.department}</h6>
                      </div>
                      <div className="student-page-address">
                        <h2>Address</h2>
                        <h6>Houseno: {studentData.houseno}</h6>
                        {studentData.apt_name ? <h6>{studentData.apt_name}</h6> : null}
                        <h6>Locality: {studentData.locality}</h6>
                        <h6>City: {studentData.city}</h6>
                        <h6>State: {studentData.state}</h6>
                        <h6>Country: {studentData.country}</h6>
                        <h6>{studentData.pincode}</h6>
                      </div>
                      <div className="student-page-hostel">
                        <h2>Hostel</h2>
                        <h6>{studentData.hostel_room}</h6>
                        <h6>{studentData.building}</h6>
                      </div>
                    </div>
                </div>
                <div className="student-page-main">
                <h3>Classes</h3>
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
                            <TableCell component="th" scope="row">{student.section_id}</TableCell>
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
        return <Redirect to="/Admin/Login" />
    }
}

export default Student
