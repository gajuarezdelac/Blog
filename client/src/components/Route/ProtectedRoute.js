import React,{ Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({isAdmin,component: Component, ...rest}) => {
    
    const {isAuthenticated,loading, user} = useSelector(state => state.UserReducer);
    
    return (  
      <Fragment>
          {loading === false && (
              <Route 
              {...rest}
              render={props => {
                  if(isAuthenticated === false) {
                      return <Redirect to="/login" />
                  }

                  if(isAdmin === false && user.role !== 'admin') {
                    return <Redirect to="/" />
                  }
                  
                  return <Component {...props} />
              }}
              />
          )}
      </Fragment>
     );
}
 
export default ProtectedRoute;