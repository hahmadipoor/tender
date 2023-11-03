import React from 'react'
import { TenderContextProvider } from './context/TenderContext';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom" 
import Home from './screens/Home';
import Header from './components/Header';
import Login from './screens/auth/Login';
import Verify from './screens/auth/Verify';
import AdminDashboard from './screens/admin-dashboard';
import AdminRoute from './components/admin/AdminRoute';
import CustomerDashboard from './screens/customer-dashboard';
import Address from './screens/address';
import OwnerDashboard from './screens/owner-dashboard';

const  App=()=> {
  return (
    <TenderContextProvider>
        <div className="container">
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/verify" component={Verify} />
                        <AdminRoute path="/admin" component={AdminDashboard} />
                        <Route path="/customer" component={CustomerDashboard} />
                        <Route path="/address" component={Address} />
                        <Route path="/owner" component={OwnerDashboard} />
                    </Switch>
                </Router>        
            </div>
    </TenderContextProvider>
  );
}

export default App;
