import React, { useState,useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import Backdrop from '@material-ui/core/Backdrop';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect,Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import "../Pages-css/Departments.css"
import {useStyles} from "../util.js"
import Loading from './Loading';
function Departments() {
    const classes = useStyles();
    const [departments, setdepartments] = useState([]);
    const [open, setopen] = useState(false);
    const [delete_id, setdelete_id] = useState("");
    const [remove_department_modal, setremove_department_modal] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const handleRemove_modal =() => {
        setremove_department_modal(!remove_department_modal);
    };
    const handleError = () => {
        seterror_state(!error_state);
      };
    useEffect(() => {
        getdepartments();
    }, []);
    const getdepartments = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/department`,
          };
        const response = await Axios(config);
        console.log(response);
        setdepartments(response.data.data);
    }
    const deletedepartment = (id) => {
        setopen(false);
        var config = {
            method: "post",
            url: `http://localhost:3000/admin/department/delete/${delete_id}`,
        };
        Axios(config)
        .then((response) => {
            console.log(response);
            if(response.data.status === "success"){
                setdepartments((prevValue) =>{
                    return prevValue.filter((department) =>{
                        return department.dept_id !== delete_id;
                    });
                });
                setopen(false);
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
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        return (
            <div className="departments-container">
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
                open={remove_department_modal}
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
                    <div className="popup-button" onClick={() => {handleRemove_modal();deletedepartment();}}>
                    <span>Yes</span>
                    </div>
                    <div className="popup-button" onClick={() => {setdelete_id("");handleRemove_modal();}}>
                    <span>No</span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
                <div className="departments-header">
                  <h1>Departments</h1>
                <Link to="/Admin/Add/Department">
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
                <div className="departments-main">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Department ID</TableCell>
                          <TableCell >Department Name</TableCell>
                          <TableCell >Details</TableCell>
                          <TableCell >Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {departments.map((department) => (
                          <TableRow key={department.dept_id}>
                            <TableCell component="th">{department.dept_id}</TableCell>
                            <TableCell >{department.name}</TableCell>
                            <TableCell ><Link to={`/Admin/Department/${department.dept_id}`}><ArrowForwardIosIcon/></Link></TableCell>
                            <TableCell>
                                <IconButton
                                classes={{
                                    root: classes.eyeButton
                                }}
                                aria-label="toggle password visibility"
                                onClick={() => {setdelete_id(department.dept_id);handleRemove_modal();}}
                                >
                                <DeleteIcon />
                                </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>
        )
    }
    else{
        return <Redirect to="/Admin/Login" />
    }
}

export default Departments
