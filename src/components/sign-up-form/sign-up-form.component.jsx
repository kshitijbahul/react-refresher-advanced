import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss';

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
            console.log('User Stored in Firestore', savedUser);
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
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Sign Up With Email and Password </span>
            <form onSubmit={handleSubmit}>
                <FormInput label = 'Display Name' required type= "text" placeholder="Your display name" name="displayName" onChange={handleChange} value={displayName}/>
                <FormInput label = 'Email' required type= "email" placeholder="email@domain.com" name="email" onChange={handleChange} value={email}/>
                <FormInput label = 'Password' required type = 'password' placeholder = 'Password' name="password" onChange={handleChange} value={password}/>
                <FormInput label = 'Confirm Password' required type = 'password' placeholder = 'Password' name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;