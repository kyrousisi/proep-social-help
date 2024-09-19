import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import FindTherapist from "./FindTherapist";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Landing } from './Landing';
import FAQ from "./FAQ";
import AdminDashboard from "./AdminDashboard";
import RequestDetails from "./RequestDetails";
import 'devextreme/dist/css/dx.light.css';
import AdminHomePage from "./AdminHomePage";
import Users_Company from "./Users_Company";
import UserPage from "./UserPage";
import Loading from "./Loading";
import Logout from "./Logout";
import ActivitiesOverview from "./ActivitiesOverview";
import MyActivities from "./ActivitiesComponents/MyActivities";



axios.defaults.baseURL = "http://localhost:5012/";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Accept"] = "application/json";
// axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
   
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;

});
function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <div className="content">
        <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/faqs">
          <FAQ />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/adminH">
          <AdminHomePage />
        </Route>
        <Route path="/adminD">
          <AdminDashboard />
        </Route>
        <Route path="/manageUC">
          <Users_Company />
        </Route>
        <Route path="/manageActivities">
          < ActivitiesOverview/>
        </Route>
        <Route path="/myActivities">
          < MyActivities/>
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/requests/:id">
              <RequestDetails />
            </Route>
        </Switch>

        
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
