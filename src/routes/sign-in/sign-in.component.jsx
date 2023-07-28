import {
    signInWithGooglePopup,
    createUserDocFromAuth,
    signInWithGoogleRedirect
} from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../components/sign-up-form/sign-up-form.compnent"

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocFromAuth(user)
    }

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn












//Empty dependencies array mean only run on mount
// useEffect(() => {
//     async function redirect() {
//         const response = await getRedirectResult(auth)
//         if(response) {
//             const userDocRef = await createUserDocFromAuth(response.user)
//         }
//     }
//     redirect()
// }, [])