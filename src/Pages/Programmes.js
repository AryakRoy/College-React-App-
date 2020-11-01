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
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect,Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import "../Pages-css/Programmes.css"
import {useStyles} from "../util.js"
import Loading from './Loading';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
function Programmes() {
    const classes = useStyles();
    const [programmes, setprogrammes] = useState([]);
    const [departments, setdepartments] = useState([]);
    const [open, setopen] = useState(false);
    const [delete_id, setdelete_id] = useState("");
    const [remove_programme_modal, setremove_programme_modal] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [temp, settemp] = useState("");
    const [temp_dept, settemp_dept] = useState("");
    const handleRemove_modal =() => {
        setremove_programme_modal(!remove_programme_modal);
    };
    const handleError = () => {
        seterror_state(!error_state);
      };
    useEffect(() => {
        getprogrammes();
        getDepartments();
    }, []);
    useEffect(() => {
        getprogramme(temp);
    },[temp]); 
    const getprogramme = async(temp) => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/programmes/${temp}`,
        }; 
        if(temp !== ""){
        const response = await Axios(config);
        console.log(response);
        setprogrammes(response.data.data);
        }
    }
    const getprogrammes = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/programmes`,
          };
        const response = await Axios(config);
        console.log(response);
        setprogrammes(response.data.data);
    }
    const getDepartments= async() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/admin/department',
        };
        const response = await Axios(config);
        console.log(response);
        setdepartments(response.data.data);
    }
    const deleteprogramme = (id) => {
        setopen(false);
        var config = {
            method: "post",
            url: `http://localhost:3000/admin/programme/delete/${delete_id}`,
        };
        Axios(config)
        .then((response) => {
            console.log(response);
            if(response.data.status === "success"){
                setprogrammes((prevValue) =>{
                    return prevValue.filter((programme) =>{
                        return programme.programme_id !== delete_id;
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
    const handleSelectChange = (event) => {
        settemp_dept(event.target.value);
        if(event.target.value === "all"){
            getprogrammes();
        }
        else{
            settemp(event.target.value);
        }  
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "admin"){
        return (
            <div className="programmes-container">
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
                open={remove_programme_modal}
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
                  <span>Are you sure you want to remove this Programme</span>
                  </div>
                  <div className="popup-buttons">
                    <div className="popup-button" onClick={() => {handleRemove_modal();deleteprogramme();}}>
                    <span>Yes</span>
                    </div>
                    <div className="popup-button" onClick={() => {setdelete_id("");handleRemove_modal();}}>
                    <span>No</span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
                <div className="programmes-header">
                  <h1>Programmes</h1>
                <Link to="/Admin/Add/Programme">
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
                <div className="programmes-select">
                <FormControl className={classes.root}>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="department-select"
                      name="department"
                      className = {classes.root}
                      value={temp_dept}
                      onChange={handleSelectChange}
                    >
                    <MenuItem value="all">All</MenuItem>
                    {
                        departments?.map((department) => (
                            <MenuItem value={department.dept_id}>{department.name}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                </div>
                <div className="programmes-main">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Programme ID</TableCell>
                          <TableCell >Programme Name</TableCell>
                          <TableCell >Department</TableCell>
                          <TableCell >Department Name</TableCell>
                          <TableCell >Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {programmes.map((programme) => (
                          <TableRow key={programme.programme_id}>
                            <TableCell component="th">{programme.programme_id}</TableCell>
                            <TableCell >{programme.name}</TableCell>
                            <TableCell>{programme.dept_id}</TableCell>
                            <TableCell>{programme.dept_name}</TableCell>
                            <TableCell>
                                <IconButton
                                classes={{
                                    root: classes.eyeButton
                                }}
                                aria-label="toggle password visibility"
                                onClick={() => {setdelete_id(programme.programme_id);handleRemove_modal();}}
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

export default Programmes
