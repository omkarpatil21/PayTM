import axios from "axios"
import { useEffect, useState } from "react"

export const DashBoard = ()=>{
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");
    useEffect(()=>{
        const timer=setTimeout(async () => {
            const response = await axios.get(`http://localhost:2000/api/v1/user/bulk/?filter=${filter}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            console.log(response.data.users);
            setUsers(response.data.users); 
        },1000)
        return()=>{
            clearTimeout(timer)
        }
    },[filter])
    return (
        <div>
            <div>
                <input onChange={(e)=>{
                    setFilter(e.target.value)
                }}type="text" placeholder="search" />
            </div>
            <div>
                {users.map((data)=>{
                    return (
                        <div>{data.username}</div>
                    )
                })}
            </div>
        </div>
    )
}