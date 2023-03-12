import { userCredentials } from "./auth.model";
import {Form, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import TextField from "../../app/forms/TextField";
import Button from "../../app/forms/Button";


export default function AuthForm(props: authformProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required('This field is required')
                    .email('You have to insert a valid email'),
                password: Yup.string().required('This field is required')
            })} 
        >
            {formikProps => (
                <Form>
                    <TextField displayName="Email" field="email" />
                    <TextField displayName="Password" field="password" type="password" />

                    <Button disabled={formikProps.isSubmitting} type="submit">Send</Button>
                    <Link className="btn btn-secondary" to="/">Cancel</Link>
                </Form>
            )}

        </Formik>
    )
}

interface authformProps {
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>) : void;
}