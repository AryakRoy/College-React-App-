import React,{useState, useEffect} from 'react'
import format  from "date-fns/format"
import Axios from "axios";
import qs from "qs";
import Loading from "../Pages/Loading.js"
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {useStyles,calcAge} from "../util.js"
import "../Pages-css/FacultySignup.css"
import {Link, Redirect} from "react-router-dom"
import csc from 'country-state-city'
function FacultySignup() {
    const classes= useStyles();
    const [open, setopen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [redirect_state, setredirect_state] = useState(false);
    const today = new Date(2000,0,1);
    const date = today.getDate();
    const year = today.getFullYear();
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [countries, setcountries] = useState([]);
    const [states, setstates] = useState([]);
    const [cities, setcities] = useState([]);
    const [building, setbuilding] = useState("");
    const [buildings, setbuildings] = useState([]);
    const [departments, setdepartments] = useState([]);
    const [rooms, setrooms] = useState([]);
    const month = today.getMonth() + 1;
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [faculty, setfaculty] = useState({
        first_name:"",
        middle_name:"",
        last_name:"",
        gender:"",
        blood_group:"",
        houseno:"",
        apt_name:"",
        locality:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
        facid:"",
        department:"",
        email:"",
        phone:"",
        password:"",
        confirm_password:"",
        cabinroomno:"",
        building:"",
    });
    const [date_of_birth, setdate_of_birth] = useState(year + "-" + month + "-" + date);
    const [validate_name, setvalidate_name] = useState({
        first_name:{
            error_state:false,
            error_message:""
        },
        last_name:{
            error_state:false,
            error_message:""
        },
        gender:{
            error_state:false,
            error_message:""
        },
        blood_group:{
            error_state:false,
            error_message:""
        }
    });
    const [validate_address, setvalidate_address] = useState({
        houseno:{
            error_state:false,
            error_message:"" 
        },
        locality:{
            error_state:false,
            error_message:""
        },
        city:{
            error_state:false,
            error_message:""
        },
        state:{
            error_state:false,
            error_message:""
        },
        country:{
            error_state:false,
            error_message:""
        },
        pincode:{
            error_state:false,
            error_message:""
        }
    });
    const [validate_info, setvalidate_info] = useState({
        facid:{
            error_state:false,
            error_message:""
        },
        department:{
            error_state:false,
            error_message:""
        },
        email:{
            error_state:false,
            error_message:""
        },
        phone:{
            error_state:false,
            error_message:""
        }
    });
    const [validate_password, setvalidate_password] = useState({
        password:{
            error_state:false,
            error_message:""
        },
        confirm_password:{
            error_state:false,
            error_message:"" 
        },
        
    });
    const [validate_cabin, setvalidate_cabin] = useState({
        building:{
            error_state:false,
            error_message:""
        },
        cabinroomno:{
            error_state:false,
            error_message:""
        },
    });
    useEffect(() => {
        getCountries();
        getBuildings();
        getDepartments();
    }, []);
    useEffect(()=>{
        getRooms();
    },[building]);
    useEffect(() => {
        getStates();
    }, [country]);
    useEffect(() => {
        getCities();
    }, [state,country]);
    const getDepartments= async() => {
        var config = {
            method: 'get',
            url: 'http://localhost:3000/admin/department',
        };
        const response = await Axios(config);
        console.log(response);
        setdepartments(response.data.data);
    }
    const getCountries = async() => {
        setcountries(csc.getAllCountries());
    }
    const getBuildings = async() => {
        var config = {
            method: 'get',
            url: `http://localhost:3000/admin/academic`,
        };
        const response = await Axios(config);
        console.log(response);
        setbuildings(response.data.data);
    }
    const getRooms = async() => {
        var config = {
            method: 'get',
            url: `http://localhost:3000/admin/building/${building}`,
        };
        const response = await Axios(config);
        console.log(response);
        setrooms(response.data.data.rooms);
    }
    const getStates = async() => {
        setstates(csc.getStatesOfCountry(country));
    }
    const getCities = async() => {
        setcities(csc.getCitiesOfState(state));
    }
    const handleChange = (event) => {
        const {name,value} = event.target;
        setfaculty((prevValue) => {
            return{
                ...prevValue,[name]:value
            }
        });
    }
    const handleSelectChange = (event) => {
        const {name,value} = event.target;
        console.log(name,value);
        setfaculty((prevValue) => {
            return {
                ...prevValue,[name]:value
            }
        });
        console.log(faculty);
    }
    const handleDateChange = (date) => {
        console.log(date);
        setdate_of_birth(format(date,'yyyy-MM-dd'));
        console.log(date_of_birth, typeof(date));
    }
    const handleCountryChange = (event) => {
        const {name,value} = event.target;
        console.log(name,value);
        setcountry(value);
        setfaculty((prevValue) => {
            return {
                ...prevValue,[name]:csc.getCountryById(value).name
            }
        });
        console.log(faculty);
    }
    const handleStateChange = (event) => {
        const {name,value} = event.target;
        console.log(name,value);
        setstate(value);
        setfaculty((prevValue) => {
            return {
                ...prevValue,[name]:csc.getStateById(value).name
            }
        });
        console.log(faculty);
    }
    const handleBuildingChange = (event) => {
        setbuilding(event.target.value);
        setfaculty((prevValue) => {
            return {
                ...prevValue,building:event.target.value
            }
        });
        console.log(faculty);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setopen(true);
        if(faculty.first_name.length > 0 && faculty.last_name.length>0 && faculty.gender.length>0 && faculty.blood_group.length>0 && faculty.houseno.length>0 && faculty.locality.length>0 && faculty.country.length>0 && faculty.state.length>0 && faculty.city.length>0 && faculty.pincode.length === 6 && faculty.facid.length>0 && faculty.department.length>0 && faculty.email.length>0 && faculty.password.length >= 6 && faculty.password === faculty.confirm_password && faculty.cabinroomno.length > 0 && faculty.building.length > 0){
            const age= calcAge(date_of_birth);
            const data = qs.stringify({
                id:faculty.facid,
                first_name:faculty.first_name,
                middle_name:faculty.middle_name,
                last_name:faculty.last_name,
                sex:faculty.gender,
                age:age,
                dob:date_of_birth,
                blood_group:faculty.blood_group,
                houseno:faculty.houseno,
                apt_name:faculty.apt_name,
                locality:faculty.locality,
                city:faculty.city,
                state:faculty.state,
                country:faculty.country,
                pincode:faculty.pincode,
                branch_id:faculty.department,
                email:faculty.email,
                phone:faculty.phone,
                pass:faculty.password,
                cabin:faculty.cabinroomno
            });
            var config = {
                method: 'post',
                url: `http://localhost:3000/faculty/register`,
                data:data,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*'
                },
            };
            console.log(data);
            Axios(config)
            .then((response) => {
                console.log(response);
                setopen(false);
                if(response.data.status === "success"){
                    localStorage.setItem('loggedusername',faculty.facid);
                    localStorage.setItem('isLogged',true);
                    localStorage.setItem('loggeduser',"faculty");
                    setopen(false);
                    setredirect_state(true);
                }
                else if (response.data.message === "user id taken"){
                    setopen(false);
                    setvalidate_info({
                        facid:{
                            error_state:true,
                            error_message:"User ID Taken"
                        },
                        department:{
                            error_state:false,
                            error_message:""
                        },
                        email:{
                            error_state:false,
                            error_message:""
                        },
                        phone:{
                            error_state:false,
                            error_message:""
                        }
                    });
                }
                else if (response.data.message === "failure"){
                    setopen(false);
                    seterror_state(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            setopen(false);
            if(faculty.first_name.length === 0){
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,first_name:{
                        error_state:true,
                        error_message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,first_name:{
                        error_state:false,
                        error_message:""
                    }
                    }
                });
            }
            if(faculty.last_name.length === 0){
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,last_name:{
                        error_state:true,
                        error_message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,last_name:{
                        error_state:false,
                        error_message:""
                    }
                    }
                });
            }
            if(faculty.gender.length === 0){
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,gender:{
                        error_state:true,
                        error_message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,gender:{
                        error_state:false,
                        error_message:""
                    }
                    }
                });
            }
            if(faculty.blood_group.length === 0){
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,blood_group:{
                        error_state:true,
                        error_message:"This field is required"
                    }
                    }
                });
            }
            else{
                setvalidate_name((prevValue) => {
                    return {
                        ...prevValue,blood_group:{
                        error_state:false,
                        error_message:""
                    }
                    }
                });
            }
            if(faculty.houseno.length === 0){
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,houseno:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,houseno:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.locality.length === 0){
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,locality:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,locality:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.city.length === 0){
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,city:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,city:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.state.length === 0){
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,state:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,state:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.country.length === 0){
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,country:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,country:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.pincode.length !== 6){
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,pincode:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_address((prevValue) => {
                    return {
                        ...prevValue,pincode:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.facid.length === 0){
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,facid:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,facid:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.department.length === 0){
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,department:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,department:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.email.length === 0){
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,email:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,email:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.phone.length === 0){
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,phone:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,phone:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.password !== faculty.confirm_password){
                setvalidate_password({
                    password:{
                        error_state:true,
                        error_message:"Passwords do not match"
                    },
                    confirm_password:{
                        error_state:true,
                        error_message:"Passwords do not match" 
                    },
                    
                });
            }
            else{
                setvalidate_password({
                    password:{
                        error_state:false,
                        error_message:""
                    },
                    confirm_password:{
                        error_state:false,
                        error_message:"" 
                    }, 
                });
            }
            if(faculty.password.length < 6){
                setvalidate_password({
                    password:{
                        error_state:true,
                        error_message:"Minimum length is 6"
                    },
                    confirm_password:{
                        error_state:false,
                        error_message:"" 
                    }, 
                });
            }
            else{
                setvalidate_password({
                    password:{
                        error_state:false,
                        error_message:""
                    },
                    confirm_password:{
                        error_state:false,
                        error_message:"" 
                    },  
                });
            }
            if(faculty.building.length === 0){
                setvalidate_cabin((prevValue) => {
                    return{
                        ...prevValue,building:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_cabin((prevValue) => {
                    return{
                        ...prevValue,building:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(faculty.cabinroomno.length === 0){
                setvalidate_cabin((prevValue) => {
                    return{
                        ...prevValue,cabinroomno:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_cabin((prevValue) => {
                    return{
                        ...prevValue,cabinroomno:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
        }    
    }
    if(redirect_state){
        return <Redirect to="/Faculty/Dashboard" />
    }
    else if(error_state){
        return <Redirect to="/Error" />
    }
    else{
        return (
            <div className="faculty-signup-container">
            <Loading open={open}/>
            <div className="faculty-signup-message">
                <h1>Welcome</h1>
                <p>Let's get you started</p>
                <Link to="/Student/Signup"><p>Student ?</p></Link>
            </div>
            <form className="faculty-signup-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="faculty-name">
                    <div className="faculty-name-header">
                        <h3>Personal Details</h3>
                    </div>
                    <div className="faculty-name-input">
                        <TextField 
                            id="name" 
                            label="First Name"
                            placeholder="Enter First Name" 
                            variant="outlined"
                            margin="normal"
                            error ={validate_name.first_name.error_state ? true: false} 
                            helperText={validate_name.first_name.error_message}
                            className = {classes.root}
                            value={faculty.first_name}
                            name="first_name"
                            onChange={handleChange}
                        />
                        <TextField 
                            id="name" 
                            label="Middle Name"
                            placeholder="Enter Middle Name" 
                            variant="outlined" 
                            margin="normal"
                            className = {classes.root}
                            value={faculty.middle_name}
                            name="middle_name"
                            onChange={handleChange}
                        />
                        <TextField 
                            id="name" 
                            label="Last Name"
                            placeholder="Enter Last Name" 
                            variant="outlined" 
                            margin="normal"
                            error ={validate_name.last_name.error_state ? true: false} 
                            className = {classes.root}
                            helperText={validate_name.last_name.error_message}
                            value={faculty.last_name}
                            name="last_name"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="faculty-select">
                    <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="gender-select"
                          name="gender"
                          value={faculty.gender}
                          onChange={handleSelectChange}
                          error ={validate_name.gender.error_state ? true: false} 
                          helperText={validate_name.gender.error_message}
                        >
                          <MenuItem value={'M'}>Male</MenuItem>
                          <MenuItem value={'F'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        name="date_of_birth"
                        variant="inline"
                        format="yyyy-MM-dd"
                        margin="normal"
                        id="date-select"
                        label="Date of Birth"
                        value={date_of_birth}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                    />
                    </MuiPickersUtilsProvider>
                    <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="Blood-Group-select"
                          name="blood_group"
                          error ={validate_name.blood_group.error_state ? true: false} 
                          helperText={validate_name.blood_group.error_message}
                          value={faculty.blood_group}
                          onChange={handleSelectChange}
                        >
                          <MenuItem value={"B+"}>B positive</MenuItem>
                          <MenuItem value={"B-"}>B negative</MenuItem>
                          <MenuItem value={"A+"}>A positive</MenuItem>
                          <MenuItem value={"A-"}>A negative</MenuItem>
                          <MenuItem value={"AB+"}>AB positive</MenuItem>
                          <MenuItem value={"AB-"}>AB negative</MenuItem>
                          <MenuItem value={"O+"}>O positive</MenuItem>
                          <MenuItem value={"O-"}>O negative</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="faculty-address">
                    <div className="faculty-address-header">
                        <h3>Address</h3>
                    </div>
                    <div className="faculty-address-input">
                        <TextField 
                            id="input-field" 
                            label="House No"
                            placeholder="Enter House No"
                            variant="outlined"
                            margin="normal"
                            className = {classes.root}
                            name="houseno"
                            value={faculty.houseno}
                            onChange={handleChange}
                            error={validate_address.houseno.error_state ? true: false}
                            helperText={validate_address.houseno.error_message}
                        /> 
                        <TextField 
                            id="input-field" 
                            label="Apartment Name"
                            placeholder="Enter Apartment Name"
                            variant="outlined"
                            margin="normal"
                            className = {classes.root}
                            name="apt_name"
                            value={faculty.apt_name}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="input-field" 
                            label="Locality"
                            placeholder="Enter Locality"
                            variant="outlined"
                            margin="normal"
                            className = {classes.root}
                            name="locality"
                            value={faculty.locality}
                            onChange={handleChange}
                            error={validate_address.locality.error_state?true:false}
                            helperText={validate_address.locality.error_message}
                        />
                        <div className="faculty-address-select">
                            <FormControl className={classes.root}>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="address-select"
                                  name="country"
                                  className = {classes.root}
                                  value={country}
                                  onChange={handleCountryChange}
                                  error={validate_address.country.error_state?true:false}
                                  helperText={validate_address.country.error_message}
                                >
                                {
                                    countries?.map((country) => (
                                     <MenuItem value={country.id}>{country.name}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl> 
                            <FormControl className={classes.root}>
                                <InputLabel id="demo-simple-select-label">State</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="address-select"
                                  name="state"
                                  className = {classes.root}
                                  value={state}
                                  onChange={handleStateChange}
                                  error={validate_address.state.error_state?true:false}
                                  helperText={validate_address.state.error_message}
                                >
                                {
                                    states?.map((state) => (
                                     <MenuItem value={state.id}>{state.name}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                            <FormControl className={classes.root}>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="address-select"
                                  name="city"
                                  className = {classes.root}
                                  value={faculty.city}
                                  onChange={handleSelectChange}
                                  error={validate_address.country.error_state?true:false}
                                  helperText={validate_address.country.error_message}
                                >
                                {
                                    cities?.map((city) => (
                                     <MenuItem value={city.name}>{city.name}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        </div> 
                        <TextField 
                            id="input-field" 
                            label="Pincode"
                            placeholder="Enter Pincode"
                            variant="outlined"
                            margin="normal"
                            className = {classes.root}
                            name="pincode"
                            value={faculty.pincode}
                            onChange={handleChange}
                            error={validate_address.pincode.error_state?true:false}
                            helperText={validate_address.pincode.error_message}
                        /> 
                    </div>
                </div>
                <div className="faculty-credential-hostel">
                    <div className="faculty-credentials">
                        <div className="faculty-credentials-header">
                            <h3>Registration Details</h3>
                        </div>
                        <div className="faculty-credentials-input">
                            <TextField 
                                id="input-field" 
                                label="Faculty ID"
                                placeholder="Enter Faculty ID"
                                variant="outlined"
                                margin="normal"
                                className = {classes.root}
                                name="facid"
                                value={faculty.facid}
                                onChange={handleChange}
                                error={validate_info.facid.error_state?true:false}
                                helperText={validate_info.facid.error_message}
                            />
                            <FormControl className={classes.root}>
                                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="department-select"
                                  name="department"
                                  className = {classes.root}
                                  value={faculty.department}
                                  onChange={handleSelectChange}
                                  error={validate_info.department.error_state?true:false}
                                  helperText={validate_info.department.error_message}
                                >
                                {
                                    departments?.map((department) => (
                                        <MenuItem value={department.dept_id}>{department.name}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                            <TextField 
                                type="email" 
                                id="input-field" 
                                label="Email"
                                placeholder="Enter Email"
                                margin="normal"
                                variant="outlined" 
                                name="email"
                                className = {classes.root}
                                value={faculty.email}
                                onChange={handleChange}
                                error={validate_info.email.error_state?true:false}
                                helperText={validate_info.email.error_message}
                            />
                            <TextField 
                                type="phone" 
                                id="input-field" 
                                label="Phone"
                                placeholder="Enter Phone"
                                margin="normal"
                                variant="outlined" 
                                name="phone"
                                className = {classes.root}
                                value={faculty.phone}
                                onChange={handleChange}
                                error={validate_info.phone.error_state?true:false}
                                helperText={validate_info.phone.error_message}
                            />
                            <TextField
                                helperText={validate_password.password.error_message}
                                id="input-field1"
                                label="Password"
                                error ={validate_password.password.error_state ? true: false}
                                variant="outlined"
                                className = {classes.root}
                                margin="normal"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={faculty.password}
                                onChange= {handleChange}
                                name="password"
                                InputProps={{endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                 classes={{
                                     root: classes.eyeButton
                                 }}
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                                 )}}
                            />
                            <TextField
                                helperText={validate_password.confirm_password.error_message}
                                id="input-field1"
                                label="Confirm Password"
                                error ={validate_password.confirm_password.error_state ? true: false}
                                variant="outlined"
                                className = {classes.root}
                                margin="normal"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Confirm Password"
                                value={faculty.confirm_password}
                                onChange= {handleChange}
                                name="confirm_password"
                                InputProps={{endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                 classes={{
                                     root: classes.eyeButton
                                 }}
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                                 )}}
                            />
                        </div> 
                    </div>
                    <div className="faculty-hostel">
                        <div className="faculty-hostel-header" >
                            <h3>Cabin</h3>
                        </div>
                        <div className="faculty-hostel-input">
                        <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Building</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="gender-select"
                          name="building"
                          value={building}
                          onChange={handleBuildingChange}
                          error={validate_cabin.building.error_state?true:false}
                          helperText={validate_cabin.building.error_message}
                        >
                          {
                            buildings?.map((building) => (
                             <MenuItem value={building.building_id}>{building.name}</MenuItem>
                            ))
                          }
                        </Select>
                        </FormControl>
                        <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Room</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="gender-select"
                          name="cabinroomno"
                          value={faculty.cabinroomno}
                          onChange={handleSelectChange}
                          error={validate_cabin.cabinroomno.error_state?true:false}
                          helperText={validate_cabin.cabinroomno.error_message}
                        >
                          {
                            rooms?.map((room) => (
                             <MenuItem value={room.room_id}>{room.room_id}</MenuItem>
                            ))
                          }
                        </Select>
                        </FormControl>
                        </div>
                    </div>
                </div>
                <div className="submit-container">
                    <input className="submit-btn" type="submit" value="Register" />
                </div>
            </form>
        </div>
        )
    }  
}

export default FacultySignup
