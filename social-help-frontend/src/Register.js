import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory, Redirect, Route } from "react-router-dom";
import React, { useState, useContext } from "react";
import Home from "./Home";
const Register = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [registerInput, setRegister] = useState({
    fname: "",
    lname: "",
    address: "",
    dob: "",
    email: "",
    companyId:"",
    password: "",
  });
  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    const data = {
      firstName: registerInput.fname,
      lastName: registerInput.lname,
      email: registerInput.email,
      companyId: registerInput.companyId,
      password: registerInput.password,
    };

       axios.post(`/Users/authenticate/register`, data).then((res) => {
     // if (res.data.status === 200) {
       console.log(res.data)
       localStorage.setItem("userId", res.data.id);
       localStorage.setItem("token", res.data.token);
       history.push("/home");
      

    }).catch(error => {
      
      
      console.log("Error Message: " + error.response.data)
    })
  };

  return (
    <div
      className="color-overlay d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Form
        className="rounded p-4 p-sm-3"
        style={{ width: "450px" }}
        onSubmit={registerSubmit}
      >
        <h3 style={{ marginBottom: "20px" }}>Register</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter email"
            type="string"
            name="email"
            onChange={handleInput}
            value={registerInput.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="string"
            name="fname"
            onChange={handleInput}
            value={registerInput.fname}
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter last name"
            name="lname"
            onChange={handleInput}
            value={registerInput.lname}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCompanyId">
          <Form.Label>Company Id</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Company Id"
            name="companyId"
            onChange={handleInput}
            value={registerInput.companyId}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="string"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={registerInput.password}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ marginBottom: "16px",
                   background:"#2D5661",
                   border:"#2D5661"
                  }}
        >
          Register
        </Button>
          
          <div><Link to="login" style={{ fontSize: '14px', textDecoration: 'none' }}>already have an account?</Link> </div>
      </Form>
    </div>
  );
};

export default Register;
