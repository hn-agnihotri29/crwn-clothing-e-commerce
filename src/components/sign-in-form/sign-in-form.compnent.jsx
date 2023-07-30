import { useState, useContext } from "react"

import { signInWithGooglePopup, 
        createUserDocFromAuth,
        signInAuthUserWithEmailAndPassowrd
    } from "../../utils/firebase/firebase.utils"


import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import { UserContext } from "../../context/userContext"


import './sign-in-form.styles.scss'



const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const {setCurrentUser} = useContext(UserContext)

    const resetFromFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            //we want to take this user object and store inside our context for that reason we use useContext.
            const {user} = await signInAuthUserWithEmailAndPassowrd(email, password)
            setCurrentUser(user)
            resetFromFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('icorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email.')
                    break
                default:
                    console.log(error)
                    break;
            }
            
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email' 
                    type="email" 
                    required 
                    name="email" 
                    onChange={handleChange} 
                    value={email} 
                />
                <FormInput 
                    label='Password' 
                    type="password" 
                    required 
                    name="password" 
                    onChange={handleChange} 
                    value={password} 
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button'  buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm