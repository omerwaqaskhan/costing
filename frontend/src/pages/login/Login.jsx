import React from 'react';
import Logo from './Logo';
import Carousel from './Carousel';
import LoginForm from './LoginForm';
import './styles.css';

const Login = () => {
    return (
        <div className="flex justify-center" 
            style={{ backgroundImage: "url('/login/login-background.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className="flex w-full">
                
            
                <div className="w-[60%] w-full flex justify-end h-screen items-center mr-8 mt-[-55px]">
                
                    <div className="mt-[-10px] flex flex-col items-center">
                        <Logo/>
                        <Carousel />
                    </div>
                </div>
                
                <div className="w-[40%] flex items-center h-screen justify-start">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;