import { createContext, useState } from 'react';

type AdminLoggedContextType = {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const AdminLoggedContext = createContext<AdminLoggedContextType | null>(null);

export const AdminLoggedContextProvider = (props: ContextProviderProps) => {

    const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <AdminLoggedContext.Provider value={{ isLogged, setIsLogged }}>
        {props.children}
    </AdminLoggedContext.Provider>
    )
}