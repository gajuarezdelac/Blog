import React,{Fragment,useState, useEffect} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser'
import {Button} from '@material-ui/core';
import  {useDispatch, useSelector} from 'react-redux';
import {createArticle, clearError  } from '../../../redux/actions/ArticleAction';
import {useHistory} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import {RadioGroup,Backdrop,CircularProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {ACTION_TYPES} from '../../../redux/constants/ArticleConst';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  subtitle: {
    fontSize: '20px',
    margin: "0px"
  },
  title: {
    fontSize: '40px',
    margin: "0px"
  },
  img: {
   width: "500px",
  },
  colorPrimary: {
    backgroundColor: "white"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CreateArticle = () => {

  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  
  const { loading, error, success }  = useSelector(state => state.NewArticleReducer);

  
  const closeError = async e => {
    e.preventDefault();
    try {
      dispatch(clearError());
  } catch (err) {
    console.log(err);
  }
}
  
  const handleOnChange = (e,editor) => {
      console.log(editor.getData());
      let data = editor.getData();
      setValue(data);
  }

  const cleanImage = () => {
    setImg('');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('title', title);
    formData.set('subtitle', subtitle);
    formData.set('content', value);
    formData.set('category', category);
    formData.set('image', img);

    dispatch(createArticle(formData))
 }
 
 const onChange = e => { 
  const reader = new FileReader();
  // En caso de que se haya puesto una imagen esta se deposita aqui
  reader.onload = () => {
    if (reader.readyState === 2) {
        setImg(reader.result)
    }
 }
 
 if(e.target.files !== 0){
 reader.readAsDataURL(e.target.files[0])
 }
}

  
useEffect(() => {
  if (success) {
    history.push('/');
    dispatch({type: ACTION_TYPES.NEW_PRODUCT_RESET});
  }

}, [dispatch, success,history]);


    return (        
  
  
  <Fragment>
   
   {loading &&
   <Backdrop className={classes.backdrop} open={loading}>
   <CircularProgress color="inherit"  />
   </Backdrop>
  }

  {error &&
      <Alert onClose={closeError} variant="filled" severity="error" >{error}</Alert>
  }


    <div className="more">
     
     <div className="cnc">
     <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Titulo</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={title} onChange={(e) => setTitle(e.target.value)}
            labelWidth={50}
          />
        </FormControl>
     </div>

     <div className="cnc">
     <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount" >Subtitulo</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
            labelWidth={70}
          />
        </FormControl>
     </div>

     <div className="cnc">
     <Button
     variant="contained"
     color="secondary"
     component="label"
     >
     Subir Imagen
     <input
     type="file"
     hidden
     accept="image/*"
     id="raised-button-file"
     onChange={onChange}
     />
    </Button>
     </div>

     <div className="cnc">
     <Button
     variant="outlined"
     color="secondary"
     component="label"
     onClick={cleanImage}
     disabled={!img && true}
     >
     Quitar Imagen
    </Button>
     </div>

     <div>
     <RadioGroup onChange={(e) => setCategory(e.target.value)} row aria-label="position" name="position" defaultValue="top">
       <FormControlLabel value="web"  control={<Radio color="primary" />} label="Web" />
       <FormControlLabel value="movil"  control={<Radio color="primary" />} label="Móvil" />
       <FormControlLabel value="otros" control={<Radio color="primary" />} label="Otros" />
      </RadioGroup>
     </div>



     <div className="guardar">
      <Button variant="contained"  disabled={(!img || !title || !subtitle  || !category) && true}  color="primary" onClick={submitHandler}>
        Guardar
      </Button>
      </div>
     


     
    </div>
     <div className="create" >
        <div className="editor">
          <CKEditor
            editor={ClassicEditor}
            onChange={handleOnChange}
            name="content"
          />
        </div>

        <div className="view" >
          <Fragment>
            {img && <div>
            <img className={classes.img} src={img} alt="ImagenPreview" />
            </div>}
            <p className={classes.title}> {title} </p>  
            <p className={classes.subtitle} >{ subtitle }</p>
            {ReactHtmlParser(value)}
            
          </Fragment>
        </div>

      
      
      </div>
       </Fragment>

   );
}
 
export default CreateArticle;