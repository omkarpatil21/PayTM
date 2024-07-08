import axios from "axios";
import { useState } from "react";
import { resolvePath, useNavigate, useSearchParams } from "react-router-dom"

export const Send = ()=>{
    const [amount,setAmount]=useState("");
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const name=searchParams.get("name");
    const navigate=useNavigate();
    const sendMoney=async()=>{
        const response = await axios.post("http://localhost:2000/api/v1/account/transfer", {
            to: id,
            amount: amount
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        
        if(response.status==200)
        {
            alert("transfer successfull")
            navigate("/dashboard")
        }
        else
        {
            navigate("/dashboard")
        }
    }
    return (
        <div>
            <h1>{name}</h1>
            <input onChange={(e)=>{setAmount(e.target.value)}}placeholder="Enter amount"></input>
            <br />
            <br />
            <button onClick={sendMoney}>send money</button>
        </div>
    )
}