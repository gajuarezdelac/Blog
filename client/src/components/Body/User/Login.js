import React,{useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {Backdrop,CircularProgress} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login, clearError } from '../../../redux/actions/UserAction';
import  {useDispatch,useSelector} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import  {useHistory, Link} from 'react-router-dom';
import MetaData from '../Article/Metadata/Metadata';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    color: "blue",
    textDecoration: "none",
   },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function Login() {

    
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  let {
    isAuthenticated, error, loading
  } = useSelector(state => state.UserReducer)
  

  useEffect(() => {
        
    if(isAuthenticated) {
        history.push('/');
    } 
    
},[isAuthenticated, history]);



const submitHandler = (e) => {
  e.preventDefault();
  dispatch(login(email, password));
}


  const closeError = async e => {
    e.preventDefault();
    try {
      dispatch(clearError());
  } catch (err) {
    console.log(err);
  }  }

  return (
 <>
{loading &&
<Backdrop className={classes.backdrop} open={loading}>
 <CircularProgress color="inherit" />
</Backdrop>
}

{error &&
      <Alert onClose={closeError} variant="filled" severity="error" >{error}</Alert>

}
<MetaData title={'Login'} />


<Container component="main" maxWidth="xs">
<CssBaseline />
<div className={classes.paper}>
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
    Sign in
  </Typography>
  <form onSubmit={submitHandler} className={classes.form} noValidate>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
    />
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={(!email || !password) && true}
      className={classes.submit}
    >
      Sign In
    </Button>
    <Grid container>
      <Grid item>
      <Link to="/register" className={classes.link}>¿No tienes una cuenta?, Registrate</Link>
      </Grid>
    </Grid>
  </form>
</div>
</Container>

</>
  );
}