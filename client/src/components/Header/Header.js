import React,{Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton,Toolbar,Typography,AppBar,Button,Avatar,Chip} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerComponent from './Drawer/Drawer';
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import  {logout} from '../../redux/actions/UserAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
   color: "#FFFF",
   textDecoration: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#013FA5",
    color: "#fff"
  }
}));

function Header() {

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  
  
  const logoutHandler = () => {
    dispatch(logout());
  }

   
  let {
    user,loading
  } = useSelector(state => state.UserReducer)


  const showDrawer = () => {
    setOpenDrawer(true)
  }
  const closeDrawer = () => {
    setOpenDrawer(false);
  }

  
  return (
    <div>
     <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => showDrawer()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>Blog</Link>
          </Typography>
        {user  ? (
          <Fragment>
      
          <Link to="user/update" className={classes.link} >  <Chip
           avatar={<Avatar className={classes.orange} src={user.avatar?.url} ></Avatar>}
           label={user.name}
           clickable
           color="primary"
           /> </Link>
   
         <Link to="/" onClick={logoutHandler} >
         <IconButton color="secondary" aria-label="add to shopping cart">
           <ExitToAppIcon />
         </IconButton>
         </Link>
         <Link to="/admin/create" >
         <IconButton aria-label="add to shopping cart">
           <AddIcon style={{ backgroundColor: "#21b6ae",}} variant="contained"/>
         </IconButton>
         </Link>
         
           </Fragment>
        ) : !loading && <Link to="/login" className={classes.link}>
          <Button  color="inherit">Login</Button></Link>}
        </Toolbar>
      </AppBar>
    </div>
     <DrawerComponent closeDrawer={closeDrawer} openDrawer={openDrawer} />
    </div>
  );
}

export default Header;