import React,{useEffect,useContext} from 'react'
import {Navbar, Nav} from 'react-bootstrap';
import logo from "../Images/logo192.png"
import "../Component-css/NavigationBar.css"
import {Avatar, Button, Menu, MenuItem,Link} from "@material-ui/core";
import {getInitial} from "../util.js"
import {makeStyles} from '@material-ui/core/styles';
import Axios from "axios";
import {UserContext} from "../App.js"
const useStyles = makeStyles({
    avatar: {
      margin: 10,
      color: '#40514e',
      backgroundColor: '#62d2a2',
    },
  });

function NavigationBar() {
    const classes = useStyles();
    const [nav_username, setnav_username] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const setstudentData = useContext(UserContext).student[1];
    const setadminData = useContext(UserContext).admin[1];
    const setfacultyData = useContext(UserContext).faculty[1];
    const getUserData = async()=>{
        var config = {
          method: "get",
          url: `http://localhost:3000/${localStorage.getItem('loggeduser')}/get/${localStorage.getItem('loggedusername')}`,
        };
        const response = await Axios(config);
        if(response.data.status === "success"){
            setnav_username(response.data.data.name);
            console.log(nav_username);
        }
    };
    useEffect(() => {
      if(localStorage.getItem('isLogged')){
        getUserData();
      }
    }, []);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
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
    const renderMenu =() =>{
      if(localStorage.getItem("loggeduser") === "student"){
        return (
          <div className="login-avatar">                  
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><Avatar className={classes.avatar}>{getInitial(nav_username)}</Avatar></Button>
          <div>
          <Menu 
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="menu"
          >
          <Link href="/Student/Dashboard"><MenuItem>Profile</MenuItem></Link>
          <Link href="/Student/Classes"><MenuItem>Classes</MenuItem></Link>
          <Link onClick= {logout}><MenuItem>Logout</MenuItem></Link>  
          </Menu>
          </div>
          </div>
        );
      }
      else if(localStorage.getItem("loggeduser") === "admin"){
        return (
          <div className="login-avatar">                  
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><Avatar className={classes.avatar}>{getInitial(nav_username)}</Avatar></Button>
          <div>
          <Menu 
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="menu"
          >
          <Link href="/Admin/Dashboard"><MenuItem>Profile</MenuItem></Link>
          <Link onClick= {logout}><MenuItem>Logout</MenuItem></Link>  
          </Menu>
          </div>
          </div>
        );
      }
      else if(localStorage.getItem("loggeduser") === "faculty"){
        return (
          <div className="login-avatar">                  
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><Avatar className={classes.avatar}>{getInitial(nav_username)}</Avatar></Button>
          <div>
          <Menu 
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="menu"
          >
          <Link href="/Faculty/Dashboard"><MenuItem>Profile</MenuItem></Link>
          <Link href="/Faculty/Classes"><MenuItem>Classes</MenuItem></Link>
          <Link onClick= {logout}><MenuItem>Logout</MenuItem></Link>  
          </Menu>
          </div>
          </div>
        );
      }
    }
    return (
        <div className="navigation-bar">
            <Navbar collapseOnSelect expand="lg" sticky="top">
                <Navbar.Brand href="/"><img src={logo} alt="Logo" className="logo" />College App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/About">About</Nav.Link>
                        {localStorage.getItem('isLogged') ? (
                            renderMenu()
                        ) : 
                        (
                        <div className="login_div">
                        <Nav.Link href="/Student/Login">Login</Nav.Link>
                        <Nav.Link href="/Student/SignUp">Signup</Nav.Link>
                        </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavigationBar
