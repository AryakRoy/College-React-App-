import React,{useState,createContext, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Home from "./Pages/Home.js"
import About from "./Pages/About.js"
import StudentLogin from "./Pages/StudentLogin.js"
import StudentSignup from "./Pages/StudentSignup.js"
import StudentDashboard from "./Pages/StudentDashboard.js"
import FacultyLogin from "./Pages/FacultyLogin.js"
import FacultySignup from "./Pages/FacultySignup.js"
import FacultyDashboard from "./Pages/FacultyDashboard.js"
import NavigationBar from "./Component/NavigationBar.js"
import NotFound from "./Pages/NotFound.js"
import Error from "./Pages/Error.js"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AdminLogin from "./Pages/AdminLogin";
import AdminSignup from "./Pages/AdminSignup";
import AdminDashboard from './Pages/AdminDashboard';
import ChangePasswordAdmin from "./Pages/ChangePasswordAdmin"
import ChangePasswordStudent from "./Pages/ChangePasswordStudent"
import ChangePasswordFaculty from "./Pages/ChangePasswordFaculty"
import ForgotPasswordStudent from "./Pages/ForgotPasswordStudent"
import ForgotPasswordFaculty from "./Pages/ForgotPasswordFaculty"
import ForgotPasswordAdmin from "./Pages/ForgotPasswordAdmin"
import ResetPasswordStudent from "./Pages/ResetPasswordStudent"
import ResetPasswordFaculty from "./Pages/ResetPasswordFaculty"
import ResetPasswordAdmin from "./Pages/ResetPasswordAdmin"
import UpdateAdminDetails from "./Pages/UpdateAdminDetails"
import UpdateStudentDetails from "./Pages/UpdateStudentDetails"
import UpdateFacultyDetails from "./Pages/UpdateFacultyDetails"
import Buildings from "./Pages/Buildings.js"
import Building from "./Pages/Building.js"
import AddBuilding from "./Pages/AddBuilding.js"
import Departments from "./Pages/Departments"
import AddDepartment from "./Pages/AddDepartment"
import Programmes from "./Pages/Programmes"
import AddProgramme from "./Pages/AddProgramme"
import Courses from "./Pages/Courses"
import Students from "./Pages/Students"
import Student from "./Pages/Student"
import StudentClasses from "./Pages/StudentClasses"
import Faculty from "./Pages/Faculty"
import FacultyClasses from "./Pages/FacultyClasses"
import Faculties from "./Pages/Faculties"
import Department from "./Pages/Department"
import AddCourse from "./Pages/AddCourse"
import FacultyClass from "./Pages/FacultyClass"
import FacultyClassStudent from "./Pages/FacultyClassStudent"
import StudentAddClass from "./Pages/StudentAddClass"
import FacultyAddClass from "./Pages/FacultyAddClass"
import AddRoom from "./Pages/AddRoom"
export const UserContext = createContext();
function App() {
  useEffect(() => {
    getJWT();
  },[]);
  
  const apiToken = "WkhWQ38ncCwy6xivIMK0wPW1IdJKieVJ3u7CgzB97KysasheEYeHENSuDyihpwaJyew";
  const getJWT = async() => {
        var config = {
            method: 'get',
            url: 'https://www.universal-tutorial.com/api/getaccesstoken',
            headers: { 
              "user-email": "aryakroy6320@gmail.com",
              "api-token": apiToken,
              Accept: "application/json"
            },
        };
        const response = await Axios(config);
        console.log(response);
        localStorage.setItem("authToken",response.data.auth_token);
  }
  const [studentData, setstudentData] = useState({
    id:"",
    name:"",
    sex:"",
    age:"",
    dob:"",
    email:"",
    phone:"",
    hostel_room:"",
    blood_group:"",
    proctor_id:"",
    proctor_name:"",
    programme_id:"",
    programme:"",
    department:"",
    building:"",
    houseno:"",
    apt_name:"",
    locality:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    start_date:"",
    sem_completed:"",
    creds_completed:"",
    curr_sem:"",
    cgpa:"",
  });
  const [facultyData, setfacultyData] = useState({
    id:"",
    name:"",
    sex:"",
    dob:"",
    age:"",                                  
    branch_id:"",
    departemnt:"",
    email:"",
    cabin_room:"",
    phone:"",
    blood_group:"",
    start_date:"",
    salary:"",
    houseno:"",
    apt_name:"",
    locality:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
  });
  const [adminData, setadminData] = useState({
    id:"",
    name:"",
    email:""
  });
  return (
    <UserContext.Provider value={{student:[studentData,setstudentData], admin:[adminData,setadminData], faculty:[facultyData,setfacultyData]}}>
        <Router>
        <div className="App">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/About" component={About} />
          <Route exact path="/Error" component={Error} />
          <Route exact path="/Student/Login" component={StudentLogin} />
          <Route exact path="/Student/ForgotPassword" component={ForgotPasswordStudent} />
          <Route exact path="/Student/ResetPassword" component={ResetPasswordStudent} />
          <Route exact path="/Student/Signup" component={StudentSignup} />
          <Route exact path="/Student/Dashboard" component={StudentDashboard} />
          <Route exact path="/Student/ChangePassword" component={ChangePasswordStudent} />
          <Route exact path="/Student/UpdateUserDetails" component={UpdateStudentDetails} />
          <Route exact path="/Student/Classes" component={StudentClasses} />
          <Route exact path="/Student/Add/Class" component={StudentAddClass} />
          <Route exact path="/Admin/Login" component={AdminLogin} />
          <Route exact path="/Admin/ForgotPassword" component={ForgotPasswordAdmin} />
          <Route exact path="/Admin/ResetPassword" component={ResetPasswordAdmin} />
          <Route exact path="/Admin/Signup" component={AdminSignup} />
          <Route exact path="/Admin/Dashboard" component={AdminDashboard} />
          <Route exact path="/Admin/ChangePassword" component={ChangePasswordAdmin} />
          <Route exact path="/Admin/UpdateUserDetails" component={UpdateAdminDetails} />
          <Route exact path="/Admin/Buildings" component={Buildings} />
          <Route exact path="/Admin/Building/:id" component={Building} />
          <Route exact path="/Admin/Building/:id/Add/Room" component={AddRoom} />
          <Route exact path="/Admin/Add/Building" component={AddBuilding} />
          <Route exact path="/Admin/Departments" component={Departments} />
          <Route exact path="/Admin/Add/Department" component={AddDepartment} />
          <Route exact path="/Admin/Department/:id" component={Department} />
          <Route exact path="/Admin/Programmes" component={Programmes} />
          <Route exact path="/Admin/Add/Programme" component={AddProgramme} />
          <Route exact path="/Admin/Courses" component={Courses} />
          <Route exact path="/Admin/Add/Course" component={AddCourse} />
          <Route exact path="/Admin/Students" component={Students} />
          <Route exact path="/Admin/Student/:id" component={Student} />
          <Route exact path="/Admin/Faculties" component={Faculties} />
          <Route exact path="/Admin/Faculty/:id" component={Faculty} />
          <Route exact path="/Faculty/Login" component={FacultyLogin} />
          <Route exact path="/Faculty/ForgotPassword" component={ForgotPasswordFaculty} />
          <Route exact path="/Faculty/ResetPassword" component={ResetPasswordFaculty} />
          <Route exact path="/Faculty/Signup" component={FacultySignup} />
          <Route exact path="/Faculty/Dashboard" component={FacultyDashboard} />
          <Route exact path="/Faculty/ChangePassword" component={ChangePasswordFaculty} />
          <Route exact path="/Faculty/UpdateUserDetails" component={UpdateFacultyDetails} />
          <Route exact path="/Faculty/Classes" component={FacultyClasses} />
          <Route exact path="/Faculty/Class/:id" component={FacultyClass} />
          <Route exact path="/Faculty/Class/:id/:stud" component={FacultyClassStudent} />
          <Route exact path="/Faculty/Add/Class" component={FacultyAddClass} />
          <Route  component={NotFound} />
        </Switch>
      </div>
      </Router>
    </UserContext.Provider>
    
  );
}

export default App;
