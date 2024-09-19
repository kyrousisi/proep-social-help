import { Card, Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import FindTherapist from "./FindTherapist";
import HomeCSS from "./Home.module.css";
import Sidebar from "./Sidebar";

import { useHistory } from "react-router-dom";


const Title = styled.h1`
  font-size: 72px;
  text-align: center;
  color: #2d5661;
`;

//fix the font later
const CardTitle = styled.h1`
  font-family: 'Titillium Web'
  font-size: 48px;
  text-align: center;
  color: black;
`;


const Home = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  function toActivities(){
    history.push("/manageActivities")
  }
  return (
    <>
    <div className='rowC' style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Sidebar/>
        
      <FindTherapist show={showModal} onHide={() => setShowModal(false)} />
      <Container fluid>
      <div style={{ flexDirection: 'column', marginRight: "200px" }}>
      <Row style={{ marginTop: "30px", marginBottom: "50px", marginLeft: '100px' }}>
        <Title>Social Help</Title>
      </Row>
      <Row
        sm={1}
        lg={3}
        className="g-4"
        style={{ marginBottom: "80px", marginLeft: "90px" }}
      >
        
        <Col>
          <Card
            className={HomeCSS.card}
            style={{
              height: "40rem",width: "20vw", cursor: 'pointer'
            }}
            onClick={() => toActivities()}
          >
            <Card.Body>
              <CardTitle>Explore the community</CardTitle>
              <Card.Img variant="top" src="exploreCommunity.png" />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card 
              className={HomeCSS.card} 
              style={{ height: "40rem",width: "20vw", cursor: 'pointer' }}>
            <Card.Body>
              <CardTitle>Find a buddy</CardTitle>
              <Card.Img
                style={{ paddingTop: "90px" }}
                variant="top"
                src="findbuddy.png"
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className={HomeCSS.card}
            style={{ height: "40rem",width: "20vw", cursor: 'pointer' }}
            onClick={() => setShowModal(true)}
            id="findTherapistCard"
            
          >
            <Card.Body>
              <CardTitle>Find a therapist</CardTitle>
              <Card.Img
                style={{ paddingTop: "130px" }}
                variant="top"
                src="findTherapist.png"
              />
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      
      <Row>
        <br />
      </Row>
      </div>
      </Container>
      </div>
    </>
  );
};

export default Home;
