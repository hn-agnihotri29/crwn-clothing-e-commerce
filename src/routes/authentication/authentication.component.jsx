

import SignUpForm from "../../components/sign-up-form/sign-up-form.compnent"
import SignInForm from "../../components/sign-in-form/sign-in-form.compnent"

import './authentication.styles.scss'



const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication












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