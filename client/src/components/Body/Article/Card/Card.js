import React, { Fragment } from 'react';
import {Box,Grid,CardActionArea,CardActions,Card,CardMedia,CardContent,Avatar,Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LanguageIcon from '@material-ui/icons/Language';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
  link: {
    color: "black",
    textDecoration: "none",
   },
   deleteBtn : {
     cursor: 'pointer'
   }
}));



const CardComponent = (props) => {

  
  const classes = useStyles();


    return (  
        <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
        <Link to={`/article/${props._id}`} className={classes.link}>
        <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.image}
              title={props.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.content}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
          <CardActions className={classes.cardActions}>
            <Box className={classes.author}>
              <Avatar src={props.userImage} />
              <Box ml={2}>
                <Typography variant="subtitle2" component="p">
                  {props.userName}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                  May 14, 2020
                </Typography>
              </Box>
            </Box>
            <Box>
             {props.user && ( <Fragment>
              <EditIcon  style={{ color: "#21b6ae",}}  color="secondary"  />
              <DeleteForeverIcon color= "secondary" className={classes.deleteBtn} onClick={() => props.handleOpen(props._id)} />
             </Fragment>) 
             } 
              <LanguageIcon color="primary" />
            </Box>
          </CardActions>
        </Card>
      </Grid>
    );
}
 
export default CardComponent;