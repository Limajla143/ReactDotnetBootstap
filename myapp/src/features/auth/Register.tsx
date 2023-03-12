import axios from "axios";
import { useState } from "react"
import agent from "../../app/api/agent";
import { authenticationResponse, userCredentials } from "./auth.model";
import AuthForm from "./AuthForm";

export default function Register() {
    const [errors, setErrors] = useState<string[]>([]);

    async function register(credentials: userCredentials) {
        try{
            setErrors([]);
            const response = await axios.post<authenticationResponse>(await agent.Account.register(credentials));
            console.log(response);
        }
        catch(error: any) {
           // setErrors(error.response.data);
        }
    }

    return (
        <>
            <h3>Register</h3>
            {/* <DisplayErrors errors={errors}/> */}
            <AuthForm 
                model={{username: '', email: '', password: ''}}
                onSubmit={async values => await register(values)}
            />
        </>
    ) 
}