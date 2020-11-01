import React,{useState, useEffect,useContext} from 'react'
import format  from "date-fns/format"
import Axios from "axios";
import qs from "qs";
import "../Pages-css/StudentSignup.css"
import Loading from "../Pages/Loading.js"
import {TextField} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {useStyles, calcAge} from "../util.js"
import {Redirect} from "react-router-dom"
import csc from 'country-state-city'
import {UserContext} from "../App.js"
function UpdateStudentDetails() {
    const classes= useStyles();
    const studentData = useContext(UserContext).student[0];
    const [open, setopen] = useState(false);
    const [error_state, seterror_state] = useState(false);
    const [redirect_state, setredirect_state] = useState(false);
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [countries, setcountries] = useState([]);
    const [states, setstates] = useState([]);
    const [cities, setcities] = useState([]);
    const [building, setbuilding] = useState("");
    const [buildings, setbuildings] = useState([]);
    const [rooms, setrooms] = useState([]);
    const names = studentData.name.split(" ");
    const [student, setstudent] = useState({
        first_name:"",
        middle_name:"",
        last_name:"",
        gender:studentData.sex,
        blood_group:studentData.blood_group,
        houseno:studentData.houseno,
        apt_name:studentData.apt_name,
        locality:studentData.locality,
        city:studentData.city,
        state:studentData.state,
        country:studentData.country,
        pincode:studentData.pincode,
        programme:studentData.programme_id,
        email:studentData.email,
        phone:studentData.phone,
        hostelroomno:studentData.hostel_room,
        building:"",
    });
    const dates = studentData.dob.split("-")
    const [date_of_birth, setdate_of_birth] = useState(dates[2] + "-" + dates[1] + "-" + dates[0]);
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
        programme:{
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
    const [validate_hostel, setvalidate_hostel] = useState({
        building:{
            error_state:false,
            error_message:""
        },
        hostelroomno:{
            error_state:false,
            error_message:""
        },
    });
    useEffect(() => {
        configureName();
        getCountries();
        getStates();
        getCities();
        configureCountry();
        getBuildings();
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
    const getCountries = async() => {
        setcountries(csc.getAllCountries());
        console.log(countries);
    }
    const getBuildings = async() => {
        var config = {
            method: 'get',
            url: `http://localhost:3000/admin/hostels`,
        };
        const response = await Axios(config);
        console.log(response);
        setbuildings(response.data.data);
    }
    const configureCountry = async() => {
        console.log(studentData);
        const countries = csc.getAllCountries();
        const index = countries.findIndex((country) => {
            return country.name === studentData.country
        });
        console.log(index);
        setcountry(index+1);
        setstates(csc.getStatesOfCountry((index+1).toString()));
        const states = csc.getStatesOfCountry((index+1).toString());
        const index1 = states.findIndex((state1) => {
            console.log(state1);
            return state1.name === studentData.state
        });
        console.log(index1);
        setstate(index1+1);
        setcities(csc.getCitiesOfState(state));
    }
    const configureName = async() => {
        if(names.length === 3){
            setstudent((prevValue) => {
                return {
                    ...prevValue,first_name:names[0],middle_name:names[1],last_name:names[2]
                }
            });
        }
        else if(names.length === 2){
            setstudent((prevValue) => {
                return {
                    ...prevValue,first_name:names[0],last_name:names[1]
                }
            });
        }
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
        setstudent((prevValue) => {
            return{
                ...prevValue,[name]:value
            }
        });
    }
    const handleSelectChange = (event) => {
        const {name,value} = event.target;
        console.log(name,value);
        setstudent((prevValue) => {
            return {
                ...prevValue,[name]:value
            }
        });
        console.log(student);
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
        setstudent((prevValue) => {
            return {
                ...prevValue,[name]:csc.getCountryById(value).name
            }
        });
        console.log(student);
    }
    const handleStateChange = (event) => {
        const {name,value} = event.target;
        console.log(name,value);
        setstate(value);
        setstudent((prevValue) => {
            return {
                ...prevValue,[name]:csc.getStateById(value).name
            }
        });
        console.log(student);
    }
    const handleBuildingChange = (event) => {
        setbuilding(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setopen(true);
        if(student.first_name.length > 0 && student.last_name.length>0 && student.gender.length>0 && student.blood_group.length>0 && student.houseno.length>0 && student.locality.length>0 && student.country.length>0 && student.state.length>0 && student.city.length>0 && student.pincode.length === 6 &&  student.programme.length>0 && student.email.length>0 &&  student.hostelroomno.length > 0){
            const age= calcAge(date_of_birth);
            console.log(age);
            const data = qs.stringify({
                first_name:student.first_name,
                middle_name:student.middle_name,
                last_name:student.last_name,
                sex:student.gender,
                age:age,
                dob:date_of_birth,
                blood_group:student.blood_group,
                houseno:student.houseno,
                apt_name:student.apt_name,
                locality:student.locality,
                city:student.city,
                state:student.state,
                country:student.country,
                pincode:student.pincode,
                programme:student.programme,
                email:student.email,
                phone:student.phone,
                hostel:student.hostelroomno
            });
            var config = {
                method: 'post',
                url: `http://localhost:3000/student/updatestudentdetails`,
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
                    setopen(false);
                    setredirect_state(true);
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
            if(student.first_name.length === 0){
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
            if(student.last_name.length === 0){
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
            if(student.gender.length === 0){
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
            if(student.blood_group.length === 0){
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
            if(student.houseno.length === 0){
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
            if(student.locality.length === 0){
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
            if(student.city.length === 0){
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
            if(student.state.length === 0){
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
            if(student.country.length === 0){
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
            if(student.pincode.length !== 6){
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
            if(student.programme.length === 0){
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,programme:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_info((prevValue) => {
                    return{
                        ...prevValue,programme:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
            if(student.email.length === 0){
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
            if(student.phone.length === 0){
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
            if(student.hostelroomno.length === 0){
                setvalidate_hostel((prevValue) => {
                    return{
                        ...prevValue,hostelroomno:{
                            error_state:true,
                            error_message:"This field is required"
                        }
                    }
                });
            }
            else{
                setvalidate_hostel((prevValue) => {
                    return{
                        ...prevValue,hostelroomno:{
                            error_state:false,
                            error_message:""
                        }
                    }
                });
            }
        }    
    }
    if(localStorage.getItem('isLogged') && localStorage.getItem('loggeduser') === "student"){
        if(redirect_state){
            return <Redirect to="/Student/Dashboard" />
        }
        else if(error_state){
            return <Redirect to="/Error" />
        }
        else{
            return (
                <div className="student-signup-container">
                    <Loading open={open}/>
                    <div className="student-signup-message">
                        <h1>Welcome</h1>
                        <p>Let's get you started</p>
                    </div>
                    <form className="student-signup-form" onSubmit={handleSubmit} autoComplete="off">
                        <div className="student-name">
                            <div className="student-name-header">
                                <h3>Personal Details</h3>
                            </div>
                            <div className="student-name-input">
                                <TextField 
                                    id="name" 
                                    label="First Name"
                                    placeholder="Enter First Name" 
                                    variant="outlined"
                                    margin="normal"
                                    error ={validate_name.first_name.error_state ? true: false} 
                                    helperText={validate_name.first_name.error_message}
                                    className = {classes.root}
                                    value={student.first_name}
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
                                    value={student.middle_name}
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
                                    value={student.last_name}
                                    name="last_name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="student-select">
                            <FormControl className={classes.root}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="gender-select"
                                  name="gender"
                                  value={student.gender}
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
                                  value={student.blood_group}
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
                        <div className="student-address">
                            <div className="student-address-header">
                                <h3>Address</h3>
                            </div>
                            <div className="student-address-input">
                                <TextField 
                                    id="input-field" 
                                    label="House No"
                                    placeholder="Enter House No"
                                    variant="outlined"
                                    margin="normal"
                                    className = {classes.root}
                                    name="houseno"
                                    value={student.houseno}
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
                                    value={student.apt_name}
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
                                    value={student.locality}
                                    onChange={handleChange}
                                    error={validate_address.locality.error_state?true:false}
                                    helperText={validate_address.locality.error_message}
                                />
                                <div className="student-address-select">
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
                                          value={student.city}
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
                                    value={student.pincode}
                                    onChange={handleChange}
                                    error={validate_address.pincode.error_state?true:false}
                                    helperText={validate_address.pincode.error_message}
                                /> 
                            </div>
                        </div>
                        <div className="student-credential-hostel">
                            <div className="student-credentials">
                                <div className="student-credentials-header">
                                    <h3>Registration Details</h3>
                                </div>
                                <div className="student-credentials-input">
                                    <FormControl className={classes.root}>
                                        <InputLabel id="demo-simple-select-label">Programme</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="programme-select"
                                          name="gender"
                                          className = {classes.root}
                                          value={student.programme}
                                          onChange={handleSelectChange}
                                          error={validate_info.programme.error_state?true:false}
                                          helperText={validate_info.programme.error_message}
                                        >
                                          <MenuItem value={'BCB'}>B.Tech Computer Science and Engineering with Speci</MenuItem>
                                          <MenuItem value={'BCE'}>B.Tech Computer Science Engineering</MenuItem>
                                          <MenuItem value={'BDS'}>B. Tech Computer Science and Engineering with Spec</MenuItem>
                                          <MenuItem value={'BIT'}>B.Tech Information Technology</MenuItem>
                                          <MenuItem value={'ECE'}>B.Tech Electronics and Communication Engineering</MenuItem>
                                          <MenuItem value={'EEE'}>B.Tech Electronics and Electrical Engineeing</MenuItem>
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
                                        value={student.email}
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
                                        value={student.phone}
                                        onChange={handleChange}
                                        error={validate_info.phone.error_state?true:false}
                                        helperText={validate_info.phone.error_message}
                                    />
                                </div> 
                            </div>
                            <div className="student-hostel">
                                <div className="student-hostel-header" >
                                    <h3>Hostel</h3>
                                </div>
                                <div className="student-hostel-input">
                                <FormControl className={classes.root}>
                                <InputLabel id="demo-simple-select-label">Building</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="gender-select"
                                  name="building"
                                  value={building}
                                  onChange={handleBuildingChange}
                                  error={validate_hostel.building.error_state?true:false}
                                  helperText={validate_hostel.building.error_message}
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
                                  name="hostelroomno"
                                  value={student.hostelroomno}
                                  onChange={handleSelectChange}
                                  error={validate_hostel.hostelroomno.error_state?true:false}
                                  helperText={validate_hostel.hostelroomno.error_message}
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
    else{
        return <Redirect to="/Student/Login" />
    }
}

export default UpdateStudentDetails
