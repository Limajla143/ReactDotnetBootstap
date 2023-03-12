
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './route.config';
import { useEffect, useState } from 'react';
import { claim } from '../../features/auth/auth.model';
import AuthenticationContext from '../../features/auth/AuthenticationContext';
import { getClaims } from '../../features/auth/handleJWT';

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims())
  }, [])

  function isAdmin() {
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }

  return (
     <BrowserRouter>
      <AuthenticationContext.Provider value={{claims, update: setClaims}}>
     <Menu />
     <div className='container'>
        <Switch>
          {routes.map(route => 
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.isAdmin && !isAdmin() ? <>
                You are not allowed to see this page
              </> : <route.component /> }
            </Route>
            )}
        </Switch>
        </div > 
        </AuthenticationContext.Provider>
     </BrowserRouter>
   
  );
}

export default App;
