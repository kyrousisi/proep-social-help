import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory, Redirect, Route } from "react-router-dom";
import React, { useState, useContext } from "react";

const FindBuddy = (props) => {

    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [registerInput, setRegister] = useState({

      reason: "",

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
        userID: localStorage.getItem("userId"),
        reason: registerInput.reason,
        labels: ["What is this"],
        RequestDate: new Date(),  
        role: 1 
      };
  
      axios.post(`/api/RoleRequest`, data).then((res) => {
        console.log(res.data)
        history.push("/home");
      });
      
    };


  


  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          overflowY: "visible",
          scrollable: true,
          background: "rgba(45, 86, 97, 0.4)",
        }}
        show={props.show}
        size="lg"
      >
        <ModalHeader
          style={{ background: "#DEF5F2" }}
          closeButton
          onClick={props.onHide}
        >
          <ModalTitle id="contained-modal-title-vcenter">
            Becoming a Buddy
          </ModalTitle>
        </ModalHeader>
        <ModalBody
          style={{
            overflow: "auto",
            scrillable: true,
            background: "#DEF5F2",
          }}
        >
          <Form.Label>Why do you want to become a buddy?</Form.Label>
          <Form.Control
            style={{ background: "#DEF5F2", height: "290px" }}
            type="string"
            name="reason"
            onChange={handleInput}
            value={registerInput.reason}
          />
          <Form.Text>Write down your motivation in a few words.</Form.Text>
        </ModalBody>
        <ModalFooter style={{ background: "#DEF5F2" }}>
          <Button style={{ backgroundColor: "#2D5661" }} onClick={registerSubmit} >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FindBuddy;
