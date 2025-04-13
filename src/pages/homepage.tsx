import React from 'react';
import { Button } from "@heroui/react";
import { useNavigate } from 'react-router-dom';

// 定义 LinkButtonWithRouter 组件
const LinkButtonWithRouter = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <Button
            className='bg-brand-500 text-white mt-4'
            variant='flat'
            onClick={handleClick}
        >
            Go to Login Page
        </Button>
    );
};

// 定义 Homepage 组件
const Homepage: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-base-200'>
            <h1 className="font-bold text-2xl text-center text-blue-500">welcome to nikochat</h1>
            <LinkButtonWithRouter />
        </div>
    );
};

export default Homepage;