import {Col, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

export const Landing = () => (
  <div style={{height: "100vh"}}>
    <div className='row'>
      <Col sm={7}>
        <img
          className='img-fluid'
          src={require('../src/assets/online_therapy.jpg')}
          alt='online_therapy' style={{marginTop: "50px"}}
        />
      </Col>
      <Col sm={5}>
        <h1 style={{marginTop: "200px", fontSize: "60px"}}>Talk to us!</h1>
        <p style={{ fontSize: "35px"}}>
          Find buddies and therapists 24/7
        </p>
        <Button as={Link} to="signup" id="navbutton" style={{ fontSize: "30px"}}>Register to the Platform Now!</Button>
      </Col>
      </div>
    </div>
);