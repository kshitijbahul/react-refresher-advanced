import { 
    signInPopup,
    googleProvider,
    createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const SignIn = () => {
    
    const logGoogleUser = async () => {
        const response = await signInPopup(googleProvider);
        console.log(response.user);
        await createUserDocFromAuth(response.user);
        console.log('User Stored in Firestore');
    }

    return (
        <div >
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <SignInForm />
            <SignUpForm />
            
        </div>
    )
}

export default SignIn;