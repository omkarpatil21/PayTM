import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{
    const [firstName, setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const createUser=async()=>{
        const response=await axios.post("http://localhost:2000/api/v1/user/signup",{
            firstName,
            lastName,
            username,
            password
        })
        console.log(response)
        if(response.data.token)
        {
            localStorage.setItem("token","Bearer "+response.data.token);
            navigate('/dashboard')
        }
        else{
            navigate("/signup")
        }
    }
    return (
        <div style={{display:"grid",justifyContent:"center"}}>
             <h1>Sign Up</h1>
            <input onChange={(e)=>
                setFirstName(e.target.value)
            } placeholder="Enter your first name"></input>
            <br /><br />
            <input onChange={(e)=>{
                setLastName(e.target.value)
            }} placeholder="Enter your last name"></input>
            <br></br>
            <br />
            <input onChange={(e)=>{
                setUsername(e.target.value)
            }} placeholder="Enter username"></input>
            <br /><br />
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} placeholder="Enter password"></input>
            <br />
            <br />
            <button onClick={createUser}>Submit</button>
        </div>
    )
}