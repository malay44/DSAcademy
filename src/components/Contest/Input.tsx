import React, { ReactNode, TextareaHTMLAttributes } from 'react';

type InputProps = {
  label: string;
  variant?: 'primary' | 'secondary';
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input: React.FC<InputProps> = ({ label, variant = 'primary', ...props }) => {
  const WrapperComponent: React.ElementType = variant === 'primary' ? 'div' : 'label';

  return (
    <div className={`flex flex-col gap-4 ${variant === 'secondary' ? '' : ''}`}>
      <WrapperComponent className={`flex items-start justify-center ${variant === 'secondary' ? '' : ''}`}>
        <span className='text-gray-700 font-medium text-lg p-1 mr-2 w-44 '>{label}</span>
        {variant === 'secondary' && <br />}
        <textarea
          {...props}
          rows={variant === 'secondary' ? 4 : 1}
          className={`bg-dark-gray-9 border-2 ${variant === 'secondary' ? '' : 'resize-none'} text-dark-gray-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
        />
      </WrapperComponent>
    </div>
  );
};

export default Input;
