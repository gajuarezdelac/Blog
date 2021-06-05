
import {Fab,Container,Card,CardMedia,CardContent,Typography,CircularProgress} from '@material-ui/core';
import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import ReactHtmlParser from 'react-html-parser'
import { getArticleDetails,clearError} from '../../../redux/actions/ArticleAction';
import Alert from '@material-ui/lab/Alert';
import MetaData from './Metadata/Metadata';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px auto"
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
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
    height: 400,
  },
  loading: {
     margin: '200px auto 0px auto',
     display: 'flex',
     justifyContent: 'center'
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
}));

const Article = () => {

  const classes = useStyles();
  const {id} = useParams()
  const dispatch = useDispatch();

  const {
    loading,
    article,
    error
  } = useSelector(state => state.ArticleDetailReducer);


  useEffect(() => {
    dispatch(getArticleDetails(id));
}, [dispatch, id]);

  
const closeError = async e => {
  e.preventDefault();
  try {
    dispatch(clearError());
} catch (err) {
  console.log(err);
}  }

  

    return ( 
        <div>
          
     {error &&
      <Alert onClose={closeError} variant="filled" severity="error" >{error}</Alert>  
     }

          {loading ?  <div className={classes.loading}><CircularProgress color="primary" /></div> : (
                <Container maxWidth="md" className={classes.root} >

                <MetaData title={article.title} />


                <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={article.image?.url}
                  title={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {article.title}
                  </Typography>
                  {/* <Typography gutterBottom variant="h6" component="h2">
                    {editUser.subtitle}
                  </Typography> */}
                  <Typography >
                    {ReactHtmlParser(article.content)}
                  </Typography>
                </CardContent>
            </Card>
             
             <Link to="/">
             <Fab variant="extended" className={classes.fab}>
              <NavigationIcon className={classes.extendedIcon} />
              volver
              </Fab>
             </Link>
                  </Container>        
          )}  
        </div>
     );
}
 
export default Article;