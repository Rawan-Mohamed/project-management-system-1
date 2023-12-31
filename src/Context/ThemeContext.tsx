
import { createContext, useState , ReactNode, useEffect} from 'react';

export interface ITheme{
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    toggleTheme: () => void;
    themeClass: string;
}
interface ThemeContextProviderProps {
    children: ReactNode;
  }
export const ThemeContext = createContext<ITheme | null>(null);

const ThemeContextProvider: React.FC<ThemeContextProviderProps>= (props)=>{
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // const savedTheme =localStorage.getItem("theme");
        const savedTheme =localStorage.getItem("isDarkMode");
        return savedTheme === 'dark';
    });
   const toggleTheme = () =>{
        // setTheme((current)=> (current === 'light' ? 'dark' : 'light' ))
        setIsDarkMode((previousValue) => !previousValue); 
    }
    useEffect(() => {
        // Save the theme preference to localStorage
        // localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        localStorage.setItem("isDarkMode", isDarkMode )
    }, [isDarkMode]);

      // j'ai utilisé la variable isDarkMode pour conditionner le rendu en fonction du thème.
      const themeClass = isDarkMode ? 'dark-theme' : 'light-theme';

    const contextValue:ITheme={
        isDarkMode, 
        setIsDarkMode,
         toggleTheme,
         themeClass
    }
    return(
        
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
        )
}
export default ThemeContextProvider