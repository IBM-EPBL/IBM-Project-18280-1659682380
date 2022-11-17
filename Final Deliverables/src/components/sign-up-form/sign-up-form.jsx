import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/FormInput";
import Button from "../button/button";
import {SignUpContainer} from "./sign-up-form.styles";

const defaultFormFields = {
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""
}

const SignUpForm = ()=>{

    const [formFields,setformFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setformFields({...formFields,[name]:value});
    }

    const handleForm = async (event)=>{
        event.preventDefault();
        setIsLoading(true)
        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }
        try{
            let data = new FormData()
            data.append("name",displayName);
            data.append("email",email);
            data.append("password",password);
            const response = await fetch('http://127.0.0.1:5000/signup',{
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
                navigate("/auth/login");
            }
        }catch(error){
            setIsLoading(false)
            if(error === 'email-already-in-use'){
                alert("User with this email already exists! Use another email!");
            }
            else{
                console.log(error);
            }
        }
        resetFormFields();
    }

    const resetFormFields = () => setformFields(defaultFormFields);

    return (
        <SignUpContainer>
            <h3>Don't have an account?</h3>
            <span>Sign Up with email and password</span>
            <form onSubmit={handleForm}>
                <FormInput 
                    label="Display Name" 
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    required 
                    onChange={handleChange}/>
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
                <FormInput 
                    label="Confirm Passowrd" 
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    required 
                    onChange={handleChange}/>
                <Button isLoading={isLoading} type="submit">Sign Up</Button>                                                  
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;