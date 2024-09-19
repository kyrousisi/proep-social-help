import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import RequestList from "./RequestList";
import useFetch from "./useFetch";
import { LoadIndicator } from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import UsersPage from "./UsersPage";
import Loading from "./Loading";
import { useHistory, Navigate, Route } from "react-router-dom";


const onClick = (e) => {
    notify("Connection error with server", 'warning', 500);
}

const logout = () => {
    notify("Logout successfull", "success", 1500)
    useHistory.go("/login")
}



const Logout = () => {
    const history = useHistory();

    const logout = () => {
        notify("Logout successfull", "success", 1500)
        localStorage.clear()
        setdata("Done");
        history.go("/login")
    }
    const [data, setdata] = useState("pre")

    

  return (
    <div>
        {data === "Done" && logout}
        {!data  === "pre" && <Loading/>}
    </div>
  );
}
 
export default Logout;