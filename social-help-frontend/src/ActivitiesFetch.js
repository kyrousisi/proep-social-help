import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import RequestList from "./RequestList";
import useFetch from "./useFetch";
import { LoadIndicator } from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import UsersPage from "./UsersPage";
import Loading from "./Loading";
import ActivitiesPage from "./ActivitiesComponents/ActivitiesPage";

const onClick = (e) => {
    notify("Connection error with server", 'warning', 500);
}





const ActivitiesFetch = () => {
    const [data, setdata] = useState()
    const [currentRole, setRole] = useState("")

    let users = []
    useEffect(() => {

        axios.get('/Users/myRole/'+localStorage.getItem("userId"))
          .then(res => {
         
             
              setRole(res.data.currentRole)
              console.log(res.data.currentRole)
              //depending on current role, change the data passed
              if(res.data.currentRole === 'Administrator')
              {
               
                axios.get('/api/Activities')
                .then(res => {
                    
                    users = res.data;
                    setdata(users)
        
                }).catch(err => notify(err, "warning"))
              }
              else
              {
                axios.get('/api/Activities/CompanyActivities/'+localStorage.getItem("userId"))
                .then(res => {
                    
                    users = res.data;
                    setdata(users)
        
                }).catch(err => notify(err, "warning"))
              }

          }).catch(err => notify(err, "warning"))
        
    }, [])

  return (
    <div>
        {data && <ActivitiesPage 
                        Activities={data}/>}
        {!data && <Loading/>}
    </div>
  );
}
 
export default ActivitiesFetch;