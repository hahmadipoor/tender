import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/nav/Header';
import Verify from './pages/Verify';
import CategoryCreate from './pages/admin/CategoryCreate';
import AdminRoute from './components/routes/AdminRoute';
import SubCreate from './pages/admin/SubCreate';
import ProductCreate from './pages/admin/ProductCreate';
import Inqueries from './pages/Inqueries';

const App=()=>{
  return(
    <>
       <Header />
       <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify" component={Verify} />
        <AdminRoute exact path="/admin/dashboard" component={CategoryCreate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <Route exact path="/customer/dashboard" component={Inqueries} />
      </Switch>
    </>
  )
}
  
export default App;
