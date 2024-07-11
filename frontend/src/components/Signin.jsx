import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "./components/BottomWarning"
import { Button } from "./components/Button"
import { Heading } from "./components/Heading"
import { InputBox } from "./components/InputBox"
import { SubHeading } from "./components/SubHeading"

export const Signin = ()=>{
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const navigate = useNavigate();
    const signRequest = async()=>{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signin`,{
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
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
               setUsername(e.target.value);
             }} placeholder="harkirat@gmail.com" label={"Email"} />
             <InputBox onChange={(e) => {
               setPassword(e.target.value)
             }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={signRequest} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}