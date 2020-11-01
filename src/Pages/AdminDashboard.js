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
import maleAvatar from "../Images/male-professor.png"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { Avatar } from '@material-ui/core';
import Loading from "../Pages/Loading.js"
function AdminDashboard() {
    const classes = useStyles();
    const [adminData,setadminData] = useContext(UserContext).admin;
    const setstudentData = useContext(UserContext).student;
    const setfacultyData = useContext(UserContext).faculty;
    const [open, setopen] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [setting_modal, setsetting_modal] = useState(false);
    const [remove_user_modal, setremove_user_modal] = useState(false);
    const [showData, setshowData] = useState(false);
    useEffect(() => {
        getadminData();
        setshowData(true);
    },[]);
    const getadminData = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/get/${localStorage.getItem('loggedusername')}`,
          };
        const response = await Axios(config);
        console.log(response);
        setadminData(response.data.data);
    }
    const handleOpen = () => {
        setsetting_modal(true);
      };
    const handleClose = () => {
        setsetting_modal(false);
    };
    const handleError = () => {
      seterror_state(!error_state);
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
    const removeUser = () => {
      setopen(true)
      var config = {
        method: 'post',
        url: `http://localhost:3000/admin/remove/${localStorage.getItem('loggedusername')}`,
      };
      Axios(config)
      .then((response) => {
        console.log(response);
        if(response.data.status === "success"){
          setopen(false);
          localStorage.removeItem('isLogged');
          localStorage.removeItem('loggedusername');
          localStorage.removeItem('loggeduser');
          setadminData({
            id:"",
            name:"",
            email:"",
          });
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
    const handleRemove_modal =() => {
        setremove_user_modal(!remove_user_modal);
    };
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        if(showData){
            return (
                <div className="student-dashboard-container">
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
                            <Link to="/Admin/ChangePassword">
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
                            <Link to="/Admin/UpdateUserDetails">
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
                            <Avatar className = {classes.avatar} src={maleAvatar} />
                        </div>
                        <div className="profile-info">
                            <div className="profile-info-header">
                                <h1>{adminData.id}</h1>
                                <Tooltip title="Settings" aria-label="settings">
                                <SettingsIcon className={classes.setting} onClick={handleOpen}/>
                                </Tooltip>
                            </div>
                            <div>
                                <h3>{adminData.name}</h3>
                            </div>
                            <div>
                                <h5>{adminData.email}</h5>
                            </div>
                            <div className={classes.paper1}>
                            <List>
                              <Link to="/Admin/Buildings">
                              <ListItem>
                              <ListItemText primary="Buildings" />
                              </ListItem>
                              </Link>
                              <Divider className={classes.divider}  />
                              <Link to="/Admin/Departments">
                              <ListItem>
                              <ListItemText primary="Departments" />
                              </ListItem>
                              </Link>
                              <Divider className={classes.divider}  />
                              <Link to="/Admin/Programmes">
                              <ListItem>
                              <ListItemText primary="Programmes" />
                              </ListItem>
                              </Link>
                              <Divider className={classes.divider}  />
                              <Link to="/Admin/Courses">
                              <ListItem>
                              <ListItemText primary="Courses" />
                              </ListItem>
                              </Link>
                              <Divider className={classes.divider}  />
                              <Link to="/Admin/Students">
                              <ListItem>
                              <ListItemText primary="Students" />
                              </ListItem>
                              </Link>
                              <Divider className={classes.divider}  />
                              <Link to="/Admin/Faculties">
                              <ListItem>
                              <ListItemText primary="Faculties" />
                              </ListItem>
                              </Link>
                            </List>
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
        return <Redirect to="/Admin/Login" />
    }
}

export default AdminDashboard
