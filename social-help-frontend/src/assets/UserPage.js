import { Col, Container, Row } from "react-bootstrap";
import { Button } from 'devextreme-react/button';
import styled from "styled-components";
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';
import notify from 'devextreme/ui/notify';
import { useState } from "react";
import UsersPage from "./UsersPage";

const UserHeader = styled.h5`
font-family: 'Titillium Web'
font-size: 32px;
text-align: left;
color: dimgrey ;
`;


 


const UserPage = (User) => {
    const showUserPopup = () => {
       UsersPage.showPopup(User)
    }
    return (
       <Container fluid>
           <Row>
                <Col>
                    <span  style={{ display:'flex', justifyContent: 'right'}}>
                        <i className="dx-icon-card" style={{ fontSize:'100px', color: '#2d5661'}}></i>
                    </span>
                </Col>
                <Col xs={8} style={{ marginTop:'10px'}}>
                    <Row style={{ textAlign: 'left'}}>
                        <UserHeader>{User.email}</UserHeader>
                    </Row>
                    <Row style={{ textAlign: 'left'}}>
                        <UserHeader>{User.firstName} {User.lastName}</UserHeader>
                    </Row>
                </Col>
                <Col style={{ display:'flex', alignItems: 'center'}}>
                   
                            <Button 
                                icon="more"
                                id="icon-back"
                                type="default"
                                stylingMode="outlined"
                                width={'30%'}
                                onClick={() => showUserPopup(User)}
                            />       
                </Col>
           </Row>

       </Container>
    );
  
     //return isLoggedIn ? <FirstHeader /> : <SecondHeader />;
  };
  
  export default UserPage;