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
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/account/transfer`, {
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
        <div className="h-full grid justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={sendMoney} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    )
}