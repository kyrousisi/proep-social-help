import { Card, Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import FindTherapist from "./FindTherapist";
import HomeCSS from "./Home.module.css";
import { Link, useHistory, Redirect, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from 'devextreme-react/button';

import Tabs from 'devextreme-react/tabs';
import SelectBox from 'devextreme-react/select-box';
import UsersPage from "./UsersPage";
import UsersFetch from "./UsersFetch";
import CompaniesPage from "./CompaiesPage";
import CompanyFetch from "./CompanyFetch";
import ActivitiesFetch from "./ActivitiesFetch";

// tabs for tab view

const tabs = [
    {
      id: 0,
      text: 'Users',
      icon: 'user',
      content: 'User tab content',
    },
    {
      id: 1,
      text: 'Companies',
      icon: 'comment',
      content: 'Comment tab content',
    },
    {
      id: 2,
      text: 'Search',
      icon: 'find',
      content: 'Find tab content',
    },
  ];
  
//---
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

const ActivitiesOverview = (props) => { 
   // const [active,setActive] = useState("Users");

    const history = useHistory();

    const BackToAdmin = () => {
    history.goBack();
  };

//shows the component according to the current tab selected
//to see event values... => console.log(e).

  return (
    <>
        <div className='rowC' style={{ display: 'flex', flexDirection: 'row-reverse'}}>
            <Sidebar/>
            
            <Container>  
               <Row style={{marginTop: '20px', alignContent: 'flex', flexDirection: 'row-reverse' }}>
                <Button 
                        icon="back"
                        id="icon-back"
                        text="Dashboard"
                        type="default"
                        stylingMode="outlined"
                        width={'15%'}
                        onClick={() => BackToAdmin()}
                        />
               </Row>


               <Row>
                   <Col>
                        <ActivitiesFetch />   
                   </Col>

               </Row>
            </Container>
        </div>

        
    </>
  );
};

export default ActivitiesOverview;