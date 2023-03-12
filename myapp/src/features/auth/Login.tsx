import axios from "axios";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/api/configureSampleLang";
import { signInUser } from "./accountSlice";
import AuthForm from "./AuthForm";

export default function Login() {

    const dispatch = useAppDispatch();
    const history = useHistory();

   // const [errors, setErrors] = useState<string[]>([]);

    async function submitForm(data: FieldValues) {
        await dispatch(signInUser(data));
        history.push('/'); 
   }

    return (
        <>
            <h3>Login</h3>
            <AuthForm model={{username: '', email: '', password: ''}} 
                onSubmit={async values => await submitForm(values)}
            />
        </>
    )
}