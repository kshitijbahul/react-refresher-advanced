import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {SignUpContainer, Title} from './sign-up-form.styles.jsx';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        // Use all od values and then update only the changed name
        setFormFields({...formFields, [name]: value});
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return ;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword({ email, password });
            const savedUser = await createUserDocFromAuth(user, { displayName });
            resetFormFields();
            alert('User Created');
        } catch (error) {
            console.error('Error creating user', error.message);
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            } else {
                alert('Error creating user', error.message);    
            }
        }

    }
    return (
        <SignUpContainer>
            <Title>Don't have an account ?</Title>
            <span>Sign Up With Email and Password </span>
            <form onSubmit={handleSubmit}>
                <FormInput label = 'Display Name' required type= "text"  name="displayName" onChange={handleChange} value={displayName}/>
                <FormInput label = 'Email' required type= "email"  name="email" onChange={handleChange} value={email}/>
                <FormInput label = 'Password' required type = 'password' name="password" onChange={handleChange} value={password}/>
                <FormInput label = 'Confirm Password' required type = 'password' name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;