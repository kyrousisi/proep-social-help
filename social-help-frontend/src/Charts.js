import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import FindTherapist from "./FindTherapist";
import HomeCSS from "./Home.module.css";
import { Link, useHistory, Redirect, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import notify from 'devextreme/ui/notify';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";



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

class Charts extends React.Component{
    constructor(props) {
        super(props);

        
        this.state = {
            Members:0,
            Admins:0,
            Therapists:0,
            Buddies:0
          };
          //this.selectionChanged = this.selectionChanged.bind(this);
          //this.deleteRecords = this.deleteRecords.bind(this);      
        
    }

    componentDidMount(){
        let users = [];

        let members = 0,buddies = 0,therapists = 0,admins = 0;
        axios.get('/Users')
            .then(res => {
                console.log(res.data)
                users = res.data
                
                for (var i = 0; i < users.length; i++) {
                    if(users[i].role == 0 ){
                        members++;
                    }
                    else if(users[i].role == 1 ){
                        buddies++;
                    }
                    else if(users[i].role == 2 ){
                        therapists++;
                    }
                    else if(users[i].role == 3 ){
                        admins++;
                    }
                }
                
                this.setState({ 
                    Members: members,
                    Admins: admins,
                    Therapists: therapists,
                    Buddies: buddies
                })

                console.log(members + " " + admins);

            }).catch(err => notify(err, "warning"))
    }

    render(){
        return(
            <Row style={{ marginTop:'40px'}}>
            <SectionHeader>Analytics</SectionHeader>
            <Col >
                <h1>Test chart</h1>
                <Doughnut 
                    data={this.doughnutData(this.state.Admins, this.state.Members, this.state.Buddies, this.state.Therapists)}
                    /> 


            </Col>

            <Col>
                <Card
                    className={HomeCSS.card}
                    style={{ width: '100%' }}
                >
                    <Card.Body>
                    <Card.Title>New users per day</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    <Card.Img variant="top" src="graph.jpg" />
                    </Card.Body>
                </Card>
            </Col>
            </Row> 
        )
    }


    doughnutData(admins, members, buddies, therapists){

        const labels = ["Admins","Members","Buddies","Therapists"];
        const data = {
            labels: labels,
            datasets: [{
            label: 'My First Dataset',
            data: [admins,members, buddies, therapists],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
            ],
            borderWidth: 1
            }]
        };
    
        return data;
    }
}
export default Charts;