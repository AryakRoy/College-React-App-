import React, { useEffect,useState } from 'react'
import Axios from "axios";
import { Redirect} from 'react-router-dom';
import "../Pages-css/Departments.css"
function FacultyClassStudent({match}) {
    const [studentData, setstudentData] = useState({});
    useEffect(() => {
        getStudentData();
    }, []);
    const getStudentData = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/student/get/${match.params.stud}`,
          };
        const response = await Axios(config);
        console.log(response);
        setstudentData(response.data.data);
    };
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "faculty"){
        return (
            <div className="department-container">
                <div className="department-header">
                    <h1>{studentData.id}</h1>
                    <div>
                        <h6>{studentData.name}</h6>
                        <h6>{studentData.sex === "M" ? "Male" : "Female"}</h6>
                        <h6>Date Of Birth: {studentData.dob}</h6>
                        <h6>Blood Group: {studentData.bloog_group}</h6>
                        {studentData.proctor_id ? <h6>Proctor: {studentData.proctor_id} {studentData.proctor_name}</h6> : null}
                        <h6>Programme: {studentData.programme}</h6>
                        <h6>Department: {studentData.department}</h6>
                    </div>
                    <div className="department-info">
                      <div className="department-office">
                        <h2>Address</h2>
                        <h6>Houseno: {studentData.houseno}</h6>
                        {studentData.apt_name ? <h6>{studentData.apt_name}</h6> : null}
                        <h6>Locality: {studentData.locality}</h6>
                        <h6>City: {studentData.city}</h6>
                        <h6>State: {studentData.state}</h6>
                        <h6>Country: {studentData.country}</h6>
                        <h6>{studentData.pincode}</h6>
                      </div>
                      <div className="department-office">
                        <h2>Hostel</h2>
                        <h6>{studentData.hostel_room}</h6>
                        <h6>{studentData.building}</h6>
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

export default FacultyClassStudent
