import React, {useState,useEffect, Fragment} from 'react'
import {Box,Grid,Container,CircularProgress,Typography,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import  {useSelector,useDispatch} from 'react-redux';
import CardComponent from './Card/Card';
import { getArticles,deleteArticle } from '../../../redux/actions/ArticleAction';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://miro.medium.com/max/2400/1*hiDj7rdNxb3u4FiQ0eYvCA.png')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    }
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
    margin: "0 0 100px 0"
  },
  loading: {
    margin: '20px auto 0px auto',
    display: 'flex',
    justifyContent: 'center'
 },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  link: {
    color: "black",
    textDecoration: "none",
   },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } ,
  paper: {
  width: "300px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  },
}));




const Home = () => {
   

  const classes = useStyles();
  const [open, setOpen] = useState(false);  
  const dispatch = useDispatch();
  const [id,setId] =useState('');
  
  
  const handleOpen = (id) => {

    setId(id);
    setOpen(true);
  };




  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandle = (id) => {
    dispatch(deleteArticle(id))
    setOpen(false);
  }
  
  
    // User 
  const {
      user
  } = useSelector(state => state.UserReducer);
  

  const {
    loading,
    articles,
  } = useSelector(state => state.ArticleReducer);

  

  useEffect(() => {   
    dispatch(getArticles());
  },[dispatch])


  return (
    <div>

      <Box className={classes.hero}>  
        <Box>Welcome! 👨‍💻 </Box>
      </Box>

      {loading ?  <dv className={classes.loading}><CircularProgress color="primary" /></dv> : (
        <Fragment>
               <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <Grid container spacing={3}>
          {
           articles.length > 0 ? articles.map((item) => {
             return  <Fragment key={item._id}>
               <CardComponent
             handleOpen={handleOpen} 
             user={user}
              image={item.image?.url}
              title={item.title}
              content={item.subtitle}
              userImage='https://media.istockphoto.com/vectors/user-sign-icon-person-symbol-human-avatar-vector-id639085642?k=6&m=639085642&s=170667a&w=0&h=Xq5G_D9UILnAc9u7Ha1NoeQpNPkW3SIk0st25O_KUnU='
              userName={"Gabriel Juarez de la Cruz"}
              _id={item._id}
             />
             </Fragment>
            }) : <div>Sin elementos</div>
          } 
          
        </Grid>
         </Container>
        </Fragment>
      )}
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"¿Seguro que deseas eliminar este articulo?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Solo ten en cuenta que una vez eliminado no podras recuperarlo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => deleteHandle(id)} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}

export default Home;