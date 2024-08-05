
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

import {signInWithEmail, signInPopup, googleProvider} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
};
const SignIn = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const {email, password} = formFields;
    const handleFormChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields, [name]: value});

    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Form Submitted');
            const { user } = await signInWithEmail(email, password);
            console.log('User Logged in with Email', user);
            resetFormFields();
        } catch (error) {
            console.error('Error signing in with Email', error.message);
            switch (error.code) {
                case 'auth/invalid-email':
                    alert('Invalid Email');
                    break;
                case 'auth/invalid-credential':
                    alert('Incorrect Password');
                    break;
                default:
                    console.log('Error Code is ', error.code);
                    alert('Error signing in with Email', error.message);
            }

        }
        
    }
    const signInWithGoogle =async  () => {
        console.log('Sign In with Google');
        try{
            const responseGoogle = await signInPopup(googleProvider);
            console.log('User Logged in with Google', responseGoogle);
        }catch(error){ 
            console.error('Error signing in with Google', error.message);
        }
    }
    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign In with your email and password</span>
            <form className='sign-in-form' onSubmit={handleFormSubmit}>
                <FormInput label='Email' required type ='email' name='email' value= {email} onChange= {handleFormChange}/>
                <FormInput label = 'Password' required  name='password' type= 'password' value={password} onChange= {handleFormChange}/>
                <div className='buttons-container'>
                    <Button type ='submit'>SIGN IN</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                </div> 
            </form>
        </div>
    );
};

export default SignIn;