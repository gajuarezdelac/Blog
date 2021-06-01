import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box,SwipeableDrawer,Divider, ListItemIcon, List,ListItem, ListItemText} from '@material-ui/core';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import { Link } from 'react-router-dom'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import WebIcon from '@material-ui/icons/Web';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { teal,deepOrange,indigo,pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    list:{
        width: 250
    },
    link: {
      color: "black",
      textDecoration: "none",
     },
  }));
  

const DrawerComponent = (props) => {
    
   const classes = useStyles();

    return ( 
     <SwipeableDrawer
     anchor="left"
     open={props.openDrawer}
     onClose={props.closeDrawer}
     onOpen={() => {}}
     >
     
     <Box textAlign="center" p={2} className={classes.list}>
     👨‍💻 Developer Blog
     </Box>
     <Divider />
     <List>

         <ListItem  divider button onClick={() =>{}}>
         <ListItemIcon>
          <WebIcon style={{ color: teal[700] }} />
        </ListItemIcon>
            <ListItemText primary={"Web Tips"}/> 
         </ListItem>

         <ListItem divider button onClick={() =>{}}>
         <ListItemIcon>
          <DeveloperModeIcon  style={{ color: deepOrange[700]}} />
        </ListItemIcon>
            <ListItemText primary={"Mobile Tips"}/> 
         </ListItem>

         <ListItem divider button onClick={() =>{}}>
         <ListItemIcon>
          <ImportantDevicesIcon style={{ color: indigo[700] }} />
        </ListItemIcon>
            <ListItemText primary={"Extras"}/> 
         </ListItem>
    
         

         <Link to="/" className={classes.link}>
         <ListItem divider button onClick={() =>{}}>
         <ListItemIcon>
          <ImportContactsIcon style={{ color: pink[700] }} />
        </ListItemIcon>
            <ListItemText primary={"Contact"}/> 
         </ListItem>
         </Link>
         
         

     </List>
     </SwipeableDrawer>
     );
}
 
export default DrawerComponent;