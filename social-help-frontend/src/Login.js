import {Form, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useState } from 'react';
import axios from 'axios';
import { useHistory, Navigate, Route } from "react-router-dom";
import notify from 'devextreme/ui/notify';

const Login = () => {
    const history = useHistory();
    const [loginInput, setLogin]= useState({
      email:"",
      password:""
    });

    const [validated,setValidated]=useState(false);

    const handleInput=(e)=>{
      e.persist();
      setLogin({...loginInput,[e.target.name]:e.target.value});
    };
    const loginSubmit=(e)=>{
      e.preventDefault();
      const form = e.currentTarget;
      if(form.checkValidity()==false){
        e.stopPropagation();
      }
      setValidated(true);
      const data={
        username: loginInput.email,
        Password: loginInput.password,
      };
      axios.post(`/Users/authenticate`,data).then((res)=>{
        
        //if(res.data.status===200){
         // console.log(res.data.status);
          console.log(res.data);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("token", res.data.token);

          notify("Login Succesfull", "success", 1500);
          //push depending on the return value
          let role = res.data.currentRole;
          if(role == "Administrator")
          {
            //move to admin homepage
            history.push('/adminH')
          }
          else{
              history.push('/home');
          }
        
      }).catch(error => {
        console.log("Status: " + error+ "  Message: " + error) 
        notify(error+ "  Message: " + error.response.data, "error", 1500);      }) 
    }

    return (
      <div className="color-overlay d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh' }}>
           <Form   
                  onSubmit={loginSubmit}
           className="rounded p-4 p-sm-3" color="#DEF5F2" margin="0">
           <Image src="logo.png" style={{ width: "6rem" }} />
             <h3 style={{ marginBottom: '20px' }}>Log in</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleInput}
            value={loginInput.email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            
            type="password"
            name="password"
            placeholder="Password" 
            onChange={handleInput}
            value={loginInput.password}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginBottom: '16px',
                                                           background:"#2D5661",
                                                           border:"#2D5661"}}>
            Login
          </Button>
          
          <div><Link to="#" style={{ fontSize: '14px', textDecoration: 'none' }}>Forgot my password</Link> </div>
          
          <div><Link to="signup" style={{ fontSize: '14px', textDecoration: 'none' }}>Create an account</Link> </div>
        </Form>
      </div>
    );
  }
   
  export default Login;