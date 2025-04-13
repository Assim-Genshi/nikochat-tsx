import React from 'react';
import { Button } from "@heroui/react";

const Homepage: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-base-200'>
      <h1 className="font-bold text-2xl text-center text-blue-500">welcome to nikochat</h1>
      <Button 
        className='bg-brand-500 text-white mt-4'
        variant='flat'
      >
        Test Button
      </Button>
    </div>
  );
};

export default Homepage;
