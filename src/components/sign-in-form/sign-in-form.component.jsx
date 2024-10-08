
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button , { BUTTON_TYPE_CLASSES } from '../button/button.component';


import { SignInContainer, Title, FormButtons } from './sign-in-form.styles.jsx';

import { signInWithEmail, signInPopup, googleProvider } from '../../utils/firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.actions';

const defaultFormFields = {
    email: '',
    password: '',
};
const SignIn = () => {
    const dispatach = useDispatch();
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;
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
            dispatach(emailSignInStart(email, password));
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
                    console.error('Error Code is ', error.code);
                    alert('Error signing in with Email', error.message);
            }

        }
        
    }
    const signInWithGoogle =async  () => {
        try{
            dispatach(googleSignInStart());
        }catch(error){ 
            console.error('Error signing in with Google', error.message);
        }
    }
    return (
        <SignInContainer>
            <Title>I already have an account</Title>
            <span>Sign In with your email and password</span>
            <form className='sign-in-form' onSubmit={handleFormSubmit}>
                <FormInput label='Email' required type ='email' name='email' value= {email} onChange= {handleFormChange}/>
                <FormInput label = 'Password' required  name='password' type= 'password' value={password} onChange= {handleFormChange}/>
                <FormButtons>
                    <Button type ='submit'>SIGN IN</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                </FormButtons> 
            </form>
        </SignInContainer>
    );
};

export default SignIn;