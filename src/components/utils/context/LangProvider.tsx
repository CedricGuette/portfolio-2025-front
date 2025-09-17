import { createContext, useState, useLayoutEffect, useContext } from 'react';
import { CookiesContext } from './CookiesProvider';

type LangContextType = {
    lang: string | null;
    setLang: React.Dispatch<React.SetStateAction<string | null>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const LangContext = createContext<LangContextType | null>(null);

export const LangProvider = (props: ContextProviderProps) => {

    const cookiesContext = useContext(CookiesContext);

    const initialLang = () => {
      if(localStorage.getItem('LANG') !== null) {
        return localStorage.getItem('LANG')
      } else {
        return 'FR'
      }
    }

    const[lang, setLang] = useState(initialLang)

    useLayoutEffect(() => {
        if(lang && cookiesContext?.cookies){
            localStorage.setItem('LANG', lang)
        }
    if (lang === 'EN') {
            document.documentElement.setAttribute('lang', 'en');
            document.title = 'Cédric Guetté - Fullstack Developer';
        } else if(lang === 'PT') {
            document.documentElement.setAttribute('lang', 'pt');
            document.title = 'Cédric Guetté - Desenvelvedor Fullstack';
        } else {
            document.documentElement.setAttribute('lang', 'fr');
            document.title = 'Cédric Guetté - Développeur Fullstack';
        }
    }, [lang, cookiesContext]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
        {props.children}
    </LangContext.Provider>
    )
}
