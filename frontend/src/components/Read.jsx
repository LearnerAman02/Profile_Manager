import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data,setData] = useState();
  const [error, setError] = useState("");
  // for getting the data from backend
  async function getData(){
    const response = await fetch("http://localhost:5000");

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if(response.ok){
      setData(result);
    }
  }

  const handleDelete = async (id)=>{
    const response = await fetch(`http://localhost:5000/${id}`,{
      method :"DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if(response.ok){
      setError("Deleted Successfully!!");

      setTimeout(() => {
        setError("");// 2 second baad error ko empty kardo and call getData function
        getData();
      }, 2000);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(data);
  
  return (
    <div className="container my-2">
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2 className="text-center">All Data</h2>
      <div className="row">
        {data?.map((ele)=>(
          <div key={ele._id} className="col-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{ele.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{ele.age}</h6>
              <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>
                Delete
              </a>
              <Link to={`/${ele._id}`} className="card-link">
                Edit
              </Link>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
