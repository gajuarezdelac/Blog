
import {Fab,Container,Card,CardMedia,CardContent,Typography} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import ReactHtmlParser from 'react-html-parser'

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


  const [editUser, setEditUser] = useState([])
  const [url, setUrl] = useState('');
  const {id} = useParams()

  const {
    articles
  } = useSelector(state => state.ArticleReducer)

  useEffect(() => {
    if(articles.length > 0){
      articles.forEach(article => {
            if(article._id === id){
                setEditUser(article)
                setUrl(article.image.url)
            }
        })

    }else{
      console.log("No se encontro!!!")
    }
},[articles, id])
   
  

    return ( 
        <div>
        <Container maxWidth="md" className={classes.root} >
        <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={url}
          title={editUser.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {editUser.title}
          </Typography>
          {/* <Typography gutterBottom variant="h6" component="h2">
            {editUser.subtitle}
          </Typography> */}
          <Typography >
            {ReactHtmlParser(editUser.content)}
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

        </div>
     );
}
 
export default Article;