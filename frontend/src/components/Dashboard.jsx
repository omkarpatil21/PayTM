import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const DashBoard = ()=>{
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const timer=setTimeout(async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk/?filter=${filter}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            setUsers(response.data.users); 
        },1000)
        return()=>{
            clearTimeout(timer)
        }
    },[filter])
    const sendMoney=(id,name)=>{
        navigate("/send?id="+id+"&name="+name);
    }
    return (
        <div style={{display: "grid",justifyContent:"left"}}>
            <div>
                <input onChange={(e)=>{
                    setFilter(e.target.value)
                }}type="text" placeholder="search" />
            </div>
            <div>
                {users.map((data)=>{
                    return (
                        <div  key={data._id}>{data.username}
                        <button onClick={()=>{sendMoney(data._id,data.username)}}>send money</button>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}