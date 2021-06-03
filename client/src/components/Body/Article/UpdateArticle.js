import React, { Fragment,useEffect } from 'react';
import { dispatch } from 'react-redux';
import { getArticleDetails,clearError} from '../../../redux/actions/ArticleAction';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import NavigationIcon from '@material-ui/icons/Navigation';
import ReactHtmlParser from 'react-html-parser'
import Alert from '@material-ui/lab/Alert';

export const UpdateArticle = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();


  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');

  const [img, setImg] = useState('');
  const [setOldImg, setOldImg] = useState('');
  const [imgPreview, setimgPreview] = useState('https://images.assetsdelivery.com/compings_v2/pavelstasevich/pavelstasevich1811/pavelstasevich181101065.jpg');

  const {
    loading,
    article,
    error
  } = useSelector(state => state.ArticleDetailReducer);

  
  useEffect(() => {
    if (article && article._id !== id) {
        dispatch(getArticleDetails(id));
    } else {
        setValue(article.content);
        setTitle(article.title);
        setSubtitle(article.subtitle);
        setOldImg(article.image.url);
        setCategory(article.category);
    }

    // if (isUpdated) {
    //     history.push('/admin/products');
    //     dispatch({ type: ACTION_TYPES.UPDATE_PRODUCT_RESET })
    // }
}, [dispatch, article, id])
 
// Nos permite cerrar el quitar el error!
const closeError = async e => {
  e.preventDefault();
  try {
    dispatch(clearError());
} catch (err) {
  console.log(err);
}}

// Capturamos la información del Rich Editor
const handleOnChange = (e,editor) => {
    console.log(editor.getData());
    let data = editor.getData();
    setValue(data);
}

// Limpiamos la
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


  return (<Fragment> 



  </Fragment>)

}