import React, { useEffect,useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from "axios";
import Backdrop from '@material-ui/core/Backdrop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect, Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import "../Pages-css/Buildings.css"
import {useStyles} from "../util.js"
import { makeStyles } from '@material-ui/core/styles';
import Loading from './Loading';
const useStyle = makeStyles({
    table: {
      maxWidth: 650,
    },
});
function Building({match}) {
    const classe = useStyle();
    const classes = useStyles();
    const id = match.params.id;
    const [building, setbuilding] = useState({});
    const [rooms, setrooms] = useState([]);
    const [delete_id, setdelete_id] = useState("");
    const [remove_building_modal, setremove_building_modal] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [open, setopen] = useState(false);
    const handleRemove_modal =() => {
        setremove_building_modal(!remove_building_modal);
    };
    const handleError = () => {
        seterror_state(!error_state);
      };
    useEffect(() => {
        getBuilding();
    }, []);
    const getBuilding = async() => {
        var config = {
            method: "get",
            url: `http://localhost:3000/admin/building/${id}`,
          };
        const response = await Axios(config);
        console.log(response);
        setbuilding(response.data.data);
        setrooms(response.data.data.rooms);
    }
    const deleteRoom = (id) => {
        setopen(false);
        var config = {
            method: "post",
            url: `http://localhost:3000/admin/room/delete/${delete_id}`,
        };
        Axios(config)
        .then((response) => {
            console.log(response);
            if(response.data.status === "success"){
                setrooms((prevValue) =>{
                    return prevValue.filter((room) =>{
                        return room.room_id !== delete_id;
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
            <div className="building-container">
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
                      <span>Are you sure you want to remove this Room</span>
                      </div>
                      <div className="popup-buttons">
                        <div className="popup-button" onClick={() => {handleRemove_modal();deleteRoom();}}>
                        <span>Yes</span>
                        </div>
                        <div className="popup-button" onClick={() => {setdelete_id("");handleRemove_modal();}}>
                        <span>No</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div className="building-header">
                    <h1>{building.name}</h1>
                </div>
                <div className="building-main">
                <div className="building-main-header">
                <h3>Rooms</h3>
                <Link to={`/Admin/Building/${id}/Add/Room`}>
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
                <div className="building-table">
                <TableContainer component={Paper}>
                    <Table className={classe.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Room ID</TableCell>
                          <TableCell >Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rooms.map((room) => (
                          <TableRow key={room.room_id}>
                            <TableCell component="th" scope="row">{room.room_id}</TableCell>
                            <TableCell>
                                <IconButton
                                classes={{
                                    root: classes.eyeButton
                                }}
                                aria-label="toggle password visibility"
                                onClick={() => {setdelete_id(room.room_id);handleRemove_modal();}}
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
            </div>
        )
    }
    else{
        return <Redirect to="/Admin/Login" />
    }
}

export default Building
