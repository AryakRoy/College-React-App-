import {makeStyles} from '@material-ui/core/styles';
export const useStyles = makeStyles(() => ({
    root: {
        '& label.Mui-focused': {
          color: '#1fab89',
        },
        '& label': {
            color: '#40514e',
          },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#40514e',
          },
          '&:hover fieldset': {
            borderColor: '#40514e',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1fab89',
          },
        },
        '& .MuiFormHelperText-root':{
          color:'#40514e'
        },
        '& .MuiInputBase-root .MuiInput-root .MuiInput-underline.MuiFocused .MuiInputBase-formControl .MuiInput-formControl .MuiFormLabel-root.MuiFocused .MuiSelect-root .MuiSelect-select .MuiSelect-selectMenu .MuiInputBase-input .MuiInput-input':{
          color:'#1fab89',
          borderColor:'#1fab89'
        }
    },
    eyeButton: {
        "&": {color: "#40514e"},
        "&:hover": { color: "#62d2a2" },
        "&:focus": { color: "#62d2a2" },
        "& .MuiIconButton-label":{color: "#40514e"},
        "& .MuiIconButton-label:hover":{color: "#62d2a2"},
        "& .MuiIconButton-label:focus":{color: "#62d2a2"}
    },
    avatar: {
      margin: 10,
      color: '#40514e',
      backgroundColor: '#62d2a2',
      width:'300px',
      height:'300px',
      fontSize: '10rem'
    },
    setting:{
      margin:10,
      width:'50px',
      height:'50px',
      color:'#40514e',
      cursor:'pointer'
    },
    icon:{
      marginRight:10,
    },
    modal:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    paper:{
      backgroundColor:'#eee',
      border:'none',
      outline:'none',
      borderRadius:'20px',
    },
    paper1:{
      border:'none',
      outline:'none',
      marginTop:'20px',
      borderRadius:'10px',
      backgroundColor:'#eee',
      textAlign:'center',
      width:'50%',
      height:'100%'
    },
    avataricon:{
      color: '#40514e',
      backgroundColor: '#62d2a2',
    },
    divider:{
      backgroundColor:'rgba(255,255,255,0.2)'
    },
    menu:{
      color:'#222831'
    },
    messageIcon:{
      width:'50px',
      height:'50px',
    },
    avataricon2:{
      color: '#40514e',
      backgroundColor: '#62d2a2',
      width:'70px',
      height:"70px"
    },
  }));
export const getInitial = (name) => {
  if(name){
    var words = name.split(" ");
  var initials = words[0].charAt(0).toUpperCase();
  return initials;
  }  
}
export const calcAge = (dob) => {
  var dates = dob.split("-");
  var year = Number(dates[0]);
  var month = Number(dates[1]) - 1;
  var day = Number(dates[2]);
  var today = new Date();
  var age = today.getFullYear() - year;
  if (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day)) {
      age--;
  }
  return age;
} 

// var config = {
        //     method: 'get',
        //     url: 'https://www.universal-tutorial.com/api/countries/',
        //     headers: { 
        //       Authorization: 'Bearer ' + localStorage.getItem("authToken"),
        //       Accept: "application/json"
        //     },
        // };
        // const response = await Axios(config);
        // console.log(response);
        // setcountries(response.data);

// var config = {
        //     method: 'get',
        //     url: `https://www.universal-tutorial.com/api/states/${country}`,
        //     headers: { 
        //       Authorization: 'Bearer ' + localStorage.getItem("authToken"),
        //       Accept: "application/json"
        //     },
        // };
        // const response = await Axios(config);
        // setstates(response.data);
// var config = {
        //     method: 'get',
        //     url: `https://www.universal-tutorial.com/api/cities/${state}`,
        //     headers: { 
        //       Authorization: 'Bearer ' + localStorage.getItem("authToken"),
        //       Accept: "application/json"
        //     },
        // };
        // const response = await Axios(config);
        // setcities(response.data);