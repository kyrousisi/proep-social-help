import { Table, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from 'react-router-dom';
import axios from 'axios';


const RequestList = ({ blogs }) => {
 
  console.log(blogs);
   const SetData = (blogid, approved) => 
   {

  //rank and suits are used as abstract variable exammples so that there is no naming
  //confusion
  const Card = (rank, suit) => { return { id: rank, status: suit } }
  
  const data = Card(blogid, approved);
     
    console.log(JSON.stringify(data))
    axios.post(`api/RoleRequest/ApproveDeny`, data).then((res)=>{
        
    console.log(res.data);
    window.location.reload();
    })
    .catch(error => {
      console.log("Status: " + error.response.data) 
      console.log(data);
    }) 

    

   }


    return (


      <div style={{ height: "100vh", marginTop: "100px" }}>
      < Table striped bordered hover>
            <thead>
            <tr>
            <th>User id</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>

  {
          blogs.map((blog) => (
          <tr key={blog.userID}>
          <td><Link to={`/requests/${blog.id}`}>
          {blog.userID}</Link></td>
          <td>{blog.reason}</td>
          <td>{blog.requestDate}</td>
          <td><Button variant="success" onClick={() => SetData(blog.id, true)}>Accept</Button>{' '}
          <Button variant="danger" onClick={() => SetData(blog.id, false)}>Deny</Button></td>
        </tr>
        
      ))
  }
</tbody>
</Table>
  </div>

    );
  }
   
  export default RequestList;