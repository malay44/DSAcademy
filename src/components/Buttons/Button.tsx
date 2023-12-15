// components/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'; 
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
    const buttonClass = `bg-${variant === 'primary' ? 'primary-blue' : 'b1'}  
    hover:bg-${variant === 'primary' ? 'blue-600' : 'blue-600'} 
    text-white
    border-b2
    h-10 min-w-[8rem] rounded-lg border border-b2 shadow-md`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;


{/* <div className='h-12 w-32'>
            <Button >
              Sign In
            </Button>
        </div>

        <div className='h-12 w-32'>
            <Button variant='secondary' >
              Sign In
            </Button>
        </div> */}
