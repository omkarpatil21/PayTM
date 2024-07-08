import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Signin = ()=>{
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const navigate = useNavigate();
    const signRequest = async()=>{
        const response = await fetch("http://localhost:2000/api/v1/user/signin",{
           method : 'POST',
           headers: {
            'Content-Type': 'application/json'
        },
           body : JSON.stringify({
            username,
            password
        })
        })
        const data= await response.json();
        if(data.token)
        {
            console.log(data.token)
            localStorage.setItem('token',"Bearer "+data.token);
            navigate('/dashboard')
        }
        else{
            navigate('/signin')
        }
    }
    return (
        <div style={{display:'grid', justifyContent : "center"}}>
            <input onChange={(e)=>{
                setUsername(e.target.value)
            }} placeholder="Enter username" />{username}
            <br></br>
            <br></br>
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} placeholder="Enter password"></input>
            <br></br>
            <br></br>
            <button onClick={signRequest}> Signin</button>
        </div>
    )
}