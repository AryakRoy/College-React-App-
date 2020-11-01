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
import "../Pages-css/Buildings.css"
import {useStyles} from "../util.js"
import Loading from './Loading';
function Buildings() {
    const classes = useStyles();
    const [buildings, setbuildings] = useState([]);
    const [open, setopen] = useState(false);
    const [delete_id, setdelete_id] = useState("");
    const [remove_building_modal, setremove_building_modal] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const handleRemove_modal =() => {
        setremove_building_modal(!remove_building_modal);
    };
    const handleError = () => {
        seterror_state(!error_state);
      };
    useEffect(() => {
        getBuildings();
    }, []);
    const getBuildings = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/buildings`,
          };
        const response = await Axios(config);
        console.log(response);
        setbuildings(response.data.data);
    }
    const deleteBuilding = (id) => {
        setopen(false);
        var config = {
            method: "post",
            url: `http://localhost:3000/admin/building/delete/${delete_id}`,
        };
        Axios(config)
        .then((response) => {
            console.log(response);
            if(response.data.status === "success"){
                setbuildings((prevValue) =>{
                    return prevValue.filter((building) =>{
                        return building.building_id !== delete_id;
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
            <div className="buildings-container">
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
                open={remove_building_modal}
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
                  <span>Are you sure you want to remove this Building</span>
                  </div>
                  <div className="popup-buttons">
                    <div className="popup-button" onClick={() => {handleRemove_modal();deleteBuilding();}}>
                    <span>Yes</span>
                    </div>
                    <div className="popup-button" onClick={() => {setdelete_id("");handleRemove_modal();}}>
                    <span>No</span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
                <div className="buildings-header">
                  <h1>Buildings</h1>
                <Link to="/Admin/Add/Building">
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
                <div className="buildings-main">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Building ID</TableCell>
                          <TableCell >Building Name</TableCell>
                          <TableCell >Details</TableCell>
                          <TableCell >Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {buildings.map((building) => (
                          <TableRow key={building.building_id}>
                            <TableCell component="th">{building.building_id}</TableCell>
                            <TableCell >{building.name}</TableCell>
                            <TableCell ><Link to={`/Admin/Building/${building.building_id}`}><ArrowForwardIosIcon/></Link></TableCell>
                            <TableCell>
                                <IconButton
                                classes={{
                                    root: classes.eyeButton
                                }}
                                aria-label="toggle password visibility"
                                onClick={() => {setdelete_id(building.building_id);handleRemove_modal();}}
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

export default Buildings
