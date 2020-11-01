import React, { useContext,useState,useEffect } from 'react'
import Axios from "axios"
import {UserContext} from "../App.js"
import {useStyles} from "../util.js"
import {Redirect} from "react-router-dom"
import "../Pages-css/StudentDashboard.css"
import SettingsIcon from '@material-ui/icons/Settings';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { Avatar } from '@material-ui/core';
import maleAvatar from "../Images/male-avatar.png"
import femaleAvatar from "../Images/female-avatar.png"
function FacultyDashboard() {
    const classes = useStyles();
    const setstudentData = useContext(UserContext).student[1];
    const setadminData = useContext(UserContext).admin[1];
    const [facultyData,setfacultyData] = useContext(UserContext).faculty;
    const [showData, setshowData] = useState(false);
    const [setting_modal, setsetting_modal] = useState(false);
    const [remove_user_modal, setremove_user_modal] = useState(false);
    useEffect(() => {
        getfacultyData();
        setshowData(true);
    },[]);
    const getfacultyData = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/faculty/get/${localStorage.getItem('loggedusername')}`,
          };
        const response = await Axios(config);
        console.log(response);
        setfacultyData(response.data.data);
    }
    const handleOpen = () => {
        setsetting_modal(true);
      };
    const handleClose = () => {
        setsetting_modal(false);
    };
    const logout = () => {
        localStorage.removeItem("isLogged");
        localStorage.removeItem("loggedusername");
        if(localStorage.getItem("loggeduser") === "student"){
          setstudentData({id:"",
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
        }
        else if(localStorage.getItem("loggeduser") === "faculty"){
          setfacultyData({
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
        }
        else if(localStorage.getItem("loggeduser") === "admin"){
          setadminData({
            id:"",
            name:"",
            email:"",
          });
        }
        localStorage.removeItem("loggeduser");  
    }
    const handleRemove_modal =() => {
        setremove_user_modal(!remove_user_modal);
    };
    const removeUser  = () => {
      var config = {
        method: 'post',
        url: `http://localhost:3000/faculty/remove/${localStorage.getItem('loggedusername')}`,
      };
      Axios(config)
      .then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          localStorage.removeItem('isLogged');
          localStorage.removeItem('loggedusername');
          localStorage.removeItem('loggeduser');
          setfacultyData({
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
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "faculty"){
        if(showData){
            return (
                <div className="student-dashboard-container">
                <Modal
                        className={classes.modal}
                        open={remove_user_modal}
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
                          <span>Are you sure you want to remove your Profile</span>
                          </div>
                          <div className="popup-buttons">
                            <div className="popup-button" onClick={() => {handleRemove_modal();handleClose();removeUser();}}>
                            <span>Yes</span>
                            </div>
                            <div className="popup-button" onClick={() => {handleRemove_modal();handleClose();}}>
                            <span>No</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                <Modal
                        className={classes.modal}
                        open={setting_modal}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                    >
                    <div className={classes.paper}>
                        <List>
                            <Link to="/Faculty/ChangePassword">
                            <ListItem button>
                              <ListItemAvatar>
                                <Avatar className={classes.avataricon}>
                                  <EditIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Change Password" />
                            </ListItem>
                            </Link>
                            <Divider className={classes.divider} variant="inset" component="li" />
                            <Link to="/Faculty/UpdateUserDetails">
                            <ListItem button>
                              <ListItemAvatar>
                                <Avatar className={classes.avataricon}>
                                  <AccountCircleIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Edit Profile"/>
                            </ListItem>
                            </Link>
                            <Divider className={classes.divider} variant="inset" component="li" />
                            <ListItem button onClick={handleRemove_modal}>
                              <ListItemAvatar>
                                <Avatar className={classes.avataricon}>
                                  <HighlightOffIcon/>
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Remove Profile"/>
                            </ListItem>
                            <Divider className={classes.divider} variant="inset" component="li" />
                            <ListItem button onClick={logout}>
                              <ListItemAvatar>
                                <Avatar className={classes.avataricon}>
                                  <ExitToAppIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Logout"/>
                            </ListItem>
                        </List>
                        </div>
                    </Modal>
                    <div className="profile-header">
                        <div className="profile-img"> 
                            <Avatar className = {classes.avatar} src={facultyData.sex === "M" ? maleAvatar : femaleAvatar} />
                        </div>
                        <div className="profile-info">
                            <div className="profile-info-header">
                                <h1>{facultyData.id}</h1>
                                <Tooltip title="Settings" aria-label="settings">
                                <SettingsIcon className={classes.setting} onClick={handleOpen}/>
                                </Tooltip>
                            </div>
                            <div>
                                <h3>{facultyData.name}</h3>
                            </div>
                            <div>
                                <h5>{facultyData.sex === "M" ? "Male" : "Female"}</h5>
                                <h5>Date Of Birth: {facultyData.dob}</h5>
                                <h5>Blood Group: {facultyData.blood_group}</h5>
                                <h5>Department: {facultyData.branch_id}</h5>
                                <h5>{facultyData.department}</h5>
                            </div>
                        </div>
                        <div className="address-hostel">
                            <div className="address">
                                <div className="address-header">
                                    <h3>Address</h3>
                                </div>
                                <div className="address-info">
                                    <h5>Houseno: {facultyData.houseno}</h5>
                                    {facultyData.apt_name ? <h5>{facultyData.apt_name}</h5> : null}
                                    <h5>Locality: {facultyData.locality}</h5>
                                    <h5>City: {facultyData.city}</h5>
                                    <h5>State: {facultyData.state}</h5>
                                    <h5>Country: {facultyData.country}</h5>
                                    <h5>{facultyData.pincode}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return <h1>Loading</h1>
        }
    }
    else{
        return <Redirect to="/Faculty/Login" />
    }
}

export default FacultyDashboard
