import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "./components/BottomWarning"
import { Button } from "./components/Button"
import { Heading } from "./components/Heading"
import { InputBox } from "./components/InputBox"
import { SubHeading } from "./components/SubHeading"
export const Signup = ()=>{
    const [firstName, setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const createUser=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,{
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
        // <div style={{display:"grid",justifyContent:"center"}}>
        //      <h1>Sign Up</h1>
        //     <input onChange={(e)=>
        //         setFirstName(e.target.value)
        //     } placeholder="Enter your first name"></input>
        //     <br /><br />
        //     <input onChange={(e)=>{
        //         setLastName(e.target.value)
        //     }} placeholder="Enter your last name"></input>
        //     <br></br>
        //     <br />
        //     <input onChange={(e)=>{
        //         setUsername(e.target.value)
        //     }} placeholder="Enter username"></input>
        //     <br /><br />
        //     <input onChange={(e)=>{
        //         setPassword(e.target.value)
        //     }} placeholder="Enter password"></input>
        //     <br />
        //     <br />
        //     <button onClick={createUser}>Submit</button>
        // </div>
         <div className="bg-slate-300 h-screen flex justify-center">
         <div className="flex flex-col justify-center">
           <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
             <Heading label={"Sign up"} />
             <SubHeading label={"Enter your infromation to create an account"} />
             <InputBox onChange={e => {
               setFirstName(e.target.value);
             }} placeholder="John" label={"First Name"} />
             <InputBox onChange={(e) => {
               setLastName(e.target.value);
             }} placeholder="Doe" label={"Last Name"} />
             <InputBox onChange={e => {
               setUsername(e.target.value);
             }} placeholder="harkirat@gmail.com" label={"Email"} />
             <InputBox onChange={(e) => {
               setPassword(e.target.value)
             }} placeholder="123456" label={"Password"} />
             <div className="pt-4">
               <Button onClick={createUser}label={"Sign up"} />
             </div>
             <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
           </div>
         </div>
       </div>
    )
}