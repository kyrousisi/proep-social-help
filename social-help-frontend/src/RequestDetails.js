import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import React, { useState, useContext } from "react";
import axios from "axios";



const RequestDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:5012/api/RoleRequest/' + id);
  const history = useHistory();



  return (
    <div className="request-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.requestDate }</h2>
          <p>{ blog.reason }</p>
          <button>Accept</button>
          <button>Deny</button>
        </article>
      )}
    </div>
  );
}
 
export default RequestDetails;