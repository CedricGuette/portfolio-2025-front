import { createContext, useState } from 'react';

type CookiesType = {
    cookies: boolean;
    setCookies: React.Dispatch<React.SetStateAction<boolean>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const CookiesContext = createContext<CookiesType | null>(null);

export const CookiesProvider = (props: ContextProviderProps) => {

    const initialCookies = () => {
      if(localStorage.getItem('COOKIES') !== null) {
        return true;
      } else {
        return false;
      }
    }

    const[cookies, setCookies] = useState(initialCookies());

  return (
    <CookiesContext.Provider value={{ cookies, setCookies }}>
        {props.children}
    </CookiesContext.Provider>
    )
}
