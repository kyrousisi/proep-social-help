import React, { useState, useEffect } from "react";

import axios from "axios";

import notify from 'devextreme/ui/notify';

import Loading from "../Loading";
import ActivitiesPage from "./ActivitiesPage";

const onClick = (e) => {
    notify("Connection error with server", 'warning', 500);
}





const MyActivitiesFetch = () => {
    const [data, setdata] = useState()

    let users = []
    useEffect(() => {

        axios.get('/api/Activities/MyActivities/'+localStorage.getItem("userId"))
        .then(res => {
            
           
            users = res.data;
           setdata(users)

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
 
export default MyActivitiesFetch;