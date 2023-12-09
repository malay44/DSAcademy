import React from 'react'
import { useTheme } from "next-themes";


const DarkModeButton: React.FC = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
            className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2 transition-all duration-100 '>
            Toggle Mode
        </button>
    )
}

export default DarkModeButton