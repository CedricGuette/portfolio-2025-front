import { createContext, useState, useLayoutEffect } from 'react';

type LangContextType = {
    lang: string | null;
    setLang: React.Dispatch<React.SetStateAction<string | null>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const LangContext = createContext<LangContextType | null>(null);

export const LangProvider = (props: ContextProviderProps) => {

    const initialLang = () => {
      if(localStorage.getItem('LANG') !== null) {
        return localStorage.getItem('LANG')
      } else {
        return 'FR'
      }
    }

    const[lang, setLang] = useState(initialLang)

    useLayoutEffect(() => {
        if(lang){
            localStorage.setItem('LANG', lang)
        }
    if (lang === 'EN') {
            document.documentElement.setAttribute('lang', 'en')
        } else if(lang === 'PT') {
            document.documentElement.setAttribute('lang', 'pt')
        } else {
            document.documentElement.setAttribute('lang', 'fr')
        }
    }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
        {props.children}
    </LangContext.Provider>
    )
}
