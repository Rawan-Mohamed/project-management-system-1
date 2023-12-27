
import { createContext, useState , ReactNode} from 'react';

export interface ITheme{
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    toggleTheme: () => void;
}
interface ThemeContextProviderProps {
    children: ReactNode;
  }
export const ThemeContext = createContext<ITheme | null>(null);

const ThemeContextProvider: React.FC<ThemeContextProviderProps>= (props)=>{
    const [theme, setTheme] = useState('light');

   const toggleTheme = () =>{
        setTheme((current)=> (current === 'light' ? 'dark' : 'light' ))
    }

    const contextValue:ITheme={
        theme,
         setTheme, 
         toggleTheme
    }
    return(
        
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
        )
}
export default ThemeContextProvider