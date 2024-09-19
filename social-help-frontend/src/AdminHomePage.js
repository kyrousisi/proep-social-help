import { Card, Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import FindTherapist from "./FindTherapist";
import HomeCSS from "./Home.module.css";
import { Link, useHistory, Redirect, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Charts from "./Charts";




const Title = styled.h1`
  font-size: 52px;
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

const SectionHeader = styled.h5`
font-family: 'Titillium Web'
font-size: 32px;
text-align: left;
color: #2d5661;
`;

const AdminHomePage = (props) => {

    const history = useHistory();

    const toRequests = () => {
    history.push("/adminD");
  };

  const toUsersCompnay = () => {
    history.push("/manageUC");
  };

  const toActivitiesOverview = () => {
    history.push("/manageActivities");
  };

  return (
    <>
        <div className='rowC' style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Sidebar/>
            
            <Container>
                
                <Row style={{ marginTop:'40px'}}>
                    <SectionHeader>Overview</SectionHeader>
                    <Col>
                        <Card
                            className={HomeCSS.card}
                            onClick={() => toRequests()}
                            style={{
                            width: "100%", cursor: 'pointer'
                            }}
                        >
                            <Card.Body>
                            <Card.Title>Manage Requests</Card.Title>
                            <Card.Img variant="top" src="exploreCommunity.png" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            className={HomeCSS.card}
                            onClick={() => toUsersCompnay()}
                            style={{
                            width: "100%", cursor: 'pointer'
                            }}
                        >
                            <Card.Body>
                            <Card.Title>Manage Clients</Card.Title>
                            <Card.Img variant="top" src="exploreCommunity.png" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            className={HomeCSS.card}
                            onClick={() => toActivitiesOverview()}
                            style={{
                            width: "100%", cursor: 'pointer'
                            }}
                        >
                            <Card.Body>
                            <Card.Title>Manage Posts</Card.Title>
                            <Card.Img variant="top" src="exploreCommunity.png" />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>  

                <Charts/>

                 
            </Container>
        </div>

        
    </>
  );
};

export default AdminHomePage;