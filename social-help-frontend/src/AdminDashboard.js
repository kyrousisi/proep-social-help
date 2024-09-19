import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import RequestList from "./RequestList";
import useFetch from "./useFetch";


const AdminDashboard = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:5012/api/RoleRequest')

  return (
    <div className="home">  
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <RequestList blogs={blogs} /> }
    </div>
  );
}
 
export default AdminDashboard;