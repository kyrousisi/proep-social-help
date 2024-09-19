import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import RequestList from "./RequestList";
import useFetch from "./useFetch";
import { LoadIndicator } from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import UsersPage from "./UsersPage";
import Loading from "./Loading";
import CompaniesPage from "./CompaiesPage";

const onClick = (e) => {
    notify("Connection error with server", 'warning', 500);
}





const CompanyFetch = () => {
    const [data, setdata] = useState()
    let companies = []
    useEffect(() => {
        axios.get('/Companies')
        .then(res => {
            //console.log(res.data)
            companies = res.data;
            setdata(companies)

        }).catch(err => notify(err, "warning"))
    }, [])

  return (
    <div>
        {data && <CompaniesPage Companies={data}/>}
        {!data && <Loading/>}
    </div>
  );
}
 
export default CompanyFetch;