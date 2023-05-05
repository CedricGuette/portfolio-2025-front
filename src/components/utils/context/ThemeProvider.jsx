import { createContext, useState, useLayoutEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const initialTheme = () => {
      if(localStorage.getItem('NIGHTMODE') !== null) {
        return localStorage.getItem('NIGHTMODE')
      } else {
        return 'light'
      }
    }

    const[theme, setTheme] = useState(initialTheme)
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'night' : 'light')
    }

    useLayoutEffect(() => {
        localStorage.setItem("NIGHTMODE", theme)
    if (theme === "light") {
          document.documentElement.classList.remove("dark-mode")
          document.documentElement.classList.add("light-mode")
        } else {
          document.documentElement.classList.remove("light-mode")
          document.documentElement.classList.add("dark-mode")
        }
      }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
