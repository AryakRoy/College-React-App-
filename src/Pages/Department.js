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
import "../Pages-css/Departments.css"
function Department({match}) {
    const id = match.params.id;
    const [department, setdepartment] = useState({});
    const [courses, setcourses] = useState([]);
    const [programmes, setprogrammes] = useState([]);
    var hod_name;
    hod_name = department.first_name + " ";
        if(department.middle_name !== null){
            hod_name = hod_name + department.middle_name + " ";
        }
    hod_name = hod_name + department.last_name;
    useEffect(() => {
        getdepartment();
    }, []);
    const getdepartment = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/department/${id}`,
          };
        const response = await Axios(config);
        console.log(response);
        setdepartment(response.data.data);
        setcourses(response.data.data.courses);
        setprogrammes(response.data.data.programmes);
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        return (
            <div className="department-container">
                <div className="department-header">
                    <h1>{department.dept_id} {department.name}</h1>
                    <div className="department-info">
                      <div className="department-office">
                        <h2>Office</h2>
                        <h6>{department.room_id}</h6>
                        <h6>{department.building_name}</h6>
                      </div>
                      <div className="department-hod">
                        <h2>HOD</h2>
                        <h6>{department.hod_id}</h6>
                        <h6>{hod_name}</h6>
                      </div>
                    </div>
                </div>
                <div className="department-main">
                <div className="department-courses">
                <h3>Courses</h3>
                <div className="department-table">
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Course ID</TableCell>
                          <TableCell >Name</TableCell>
                          <TableCell>Pre Requisite ID</TableCell>
                          <TableCell>Pre Requisite Name</TableCell>
                          <TableCell>Head Faculty ID</TableCell>
                          <TableCell>Head Faculty name</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {courses?.map((course) => (
                          <TableRow key={course.course_id}>
                            <TableCell component="th" scope="row">{course.course_id}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            {course.preq_id === null ? (
                                <TableCell>None</TableCell>
                            ):(
                                <TableCell>{course.preq_id}</TableCell>
                            )
                            }
                            {course.preq_name === null ? (
                                <TableCell>None</TableCell>
                            ):(
                                <TableCell>{course.preq_name}</TableCell>
                            )}
                            <TableCell>{course.head_fac_id}</TableCell>
                            <TableCell>{course.first_name + " " + (course.middle_name === null ? "" :course.middle_name + " ") + course.last_name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                </div>
                </div>
                <div className="department-programmes">
                    <h3>Programmes</h3>
                    <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Programme ID</TableCell>
                          <TableCell >Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {programmes?.map((programme) => (
                          <TableRow key={programme.course_id}>
                            <TableCell component="th" scope="row">{programme.programme_id}</TableCell>
                            <TableCell>{programme.name}</TableCell>
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

export default Department
