import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/FormInput";
import Button from "../button/button";
import { UserContext } from "../../contexts/user.context";
import {SignInContainer,ButtonsContainer} from "./sign-in-form.styles";

const defaultFormFields = {
    email : "",
    password : "",
}

const SignInForm = ()=>{

    const {setCurrentUser} = useContext(UserContext);
    const [formFields,setformFields] = useState(defaultFormFields);
    const {email,password} = formFields;
    const navigate = useNavigate();

    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setformFields({...formFields,[name]:value});
    }

    const handleForm =async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        try{
            let data = new FormData()
            data.append("email",email)
            data.append("password",password)
            const response = await fetch('http://127.0.0.1:5000/login',{
                method:'POST',
                body:data,
                header:{
                    'Access-Control-Allow-Origin':'*'
                }
            })
            const value = await response.json()
            if(value.code !== "ok"){
                throw value.code
            }
            else{
                setCurrentUser(value.user);
                navigate("/");
            }
        }catch(error){
            setIsLoading(false);
            switch(error){
                case "wrong-password":
                    alert("Email and password do not match");
                    break;
                case "user-not-found":
                    alert("User with this email does not exist");
                    break;
                default:
                    alert("Unknown error occurred");
                    console.log(error);
                    break;
            } 
        }
        resetFormFields();
    }

    const resetFormFields = () => setformFields(defaultFormFields);

    return (
        <SignInContainer>
            <h3>I already have an account</h3>
            <span>Sign In with email and password</span>
            <form onSubmit={handleForm}>
                <FormInput 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={email} 
                    required 
                    onChange={handleChange}/>
                <FormInput 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={password} 
                    required 
                    onChange={handleChange}/>
                <ButtonsContainer>
                    <Button isLoading={isLoading} type="submit">Login</Button>                                                  
                </ButtonsContainer>                                                  
            </form>
        </SignInContainer>
    );
}

export default SignInForm;