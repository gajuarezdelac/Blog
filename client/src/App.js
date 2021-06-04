import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useEffect} from 'react';
import { loadUser } from './redux/actions/UserAction';
import store from './redux/Store';
import ProtectedRoute from './components/Route/ProtectedRoute';

// Components
import Header from './components/Header/Header';
import Login from './components/Body/User/Login';
import Home from './components/Body/Article/ViewArticles';
import CreateArticle from './components/Body/Article/CreateArticle';
import Article from './components/Body/Article/Article';
import {UpdateArticle} from './components/Body/Article/UpdateArticle';


function App() {
   
  useEffect(() => {
    store.dispatch(loadUser());
  },[])



  

  return (
    <Router>
    <div className="App">
      <Header/>
      <Route path="/" component={Home}  exact/>
      {/* <Route path="/search/:keyword" component={Home}/> */}
      <Route path="/article/:id" component={Article}  exact/>
      <Route path="/login" component={Login}  exact/>
      {/* <Route path="/register" component={Register}  exact/> */}
      {/* <Route path="/password/forgot" component={ForgotPassword}  exact/> */}
      {/* <Route path="/password/reset/:token" component={NewPassword}  exact/> */}
      {/* <Route path="/cart" component={Cart}  exact/> */}
      
      {/* <ProtectedRoute path="/me" component={Profile}  exact/> */}
      {/* <ProtectedRoute path="/me/update" component={UpdateProfile}  exact/> */}
      {/* <ProtectedRoute path="/password/update" component={UpdatePassword}  exact/> */}
      <ProtectedRoute path="/admin/create" isAdmin={true} component={CreateArticle}  exact/>
      <ProtectedRoute path="/admin/update/:id" isAdmin={true} component={UpdateArticle}  exact/>
    
      </div>  
      {/* <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard}  exact/>
      <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductList}  exact/>
      
      <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrderList}  exact/>
      <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder}  exact/>
      <ProtectedRoute path="/admin/users" isAdmin={true} component={UserList}  exact/>
      <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser}  exact/>
      <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews}  exact/> */}
    </Router>
  );
}

export default App;
