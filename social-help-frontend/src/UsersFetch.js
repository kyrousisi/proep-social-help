import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import RequestList from "./RequestList";
import useFetch from "./useFetch";
import { LoadIndicator } from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import UsersPage from "./UsersPage";
import Loading from "./Loading";

const onClick = (e) => {
    notify("Connection error with server", 'warning', 500);
}





const UsersFetch = () => {
    const [data, setdata] = useState()
    let users = []
    useEffect(() => {
        axios.get('/Users')
        .then(res => {
            console.log(res.data)
            users = res.data;
            setdata(users)

        }).catch(err => notify(err, "warning"))
    }, [])

  return (
    <div>
        {data && <UsersPage Users={data}/>}
        {!data && <Loading/>}
    </div>
  );
}
 
export default UsersFetch;