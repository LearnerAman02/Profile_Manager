import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");

  const {id} = useParams();

  const navigate = useNavigate();

  // get single user data
  const getSingleUser = async ()=>{

    const response = await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if(response.ok){
      setError("");
      console.log("updated user",result);
    }
    setName(result.name);
    setEmail(result.email);
    setAge(result.age);
  };

  // send updated data to backend
  const handleUpdate = async (e)=>{
    e.preventDefault(); // so that we can prevent default values
    // code for sending data into BACKEND
    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok){
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok){
      setError("");
      navigate("/all");// submit krne pe iss url pe navigate kar do
    }
  }
  useEffect(() => {
    getSingleUser();
  }, [])
  

  return (
    <div className="container my-2">
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h1 className="text-center">Edit the data</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
