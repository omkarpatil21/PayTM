import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/components/Appbar"
import { Balance } from "../components/components/Balance"
import { BottomWarning } from "./components/BottomWarning"
import { Button } from "./components/Button"
import { Heading } from "./components/Heading"
import { InputBox } from "./components/InputBox"
import { SubHeading } from "./components/SubHeading"

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
        <div>
            <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
        </div>
        <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
        </div>
    )
}


function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}