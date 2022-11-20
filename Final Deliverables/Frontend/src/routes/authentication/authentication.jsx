import { Routes,Route } from "react-router-dom";

import SignInForm from "../../components/sign-in-form/sign-in";
import SignUpForm from "../../components/sign-up-form/sign-up-form";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = ()=>{
    return (
        <AuthenticationContainer>
            <Routes>
                <Route path='login' element={<SignInForm />}/>
                <Route path="signup" element = {<SignUpForm />}/>
            </Routes>
        </AuthenticationContainer>
    );
}

export default Authentication;

