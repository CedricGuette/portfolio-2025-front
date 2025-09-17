import { createContext, useState } from 'react';

type AlertBoxContextType = {
    alertBox: string | null;
    setAlertBox: React.Dispatch<React.SetStateAction<string | null>>;
    alertBoxType: string | null;
    setAlertBoxType: React.Dispatch<React.SetStateAction<string | null>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const AlertBoxContext = createContext<AlertBoxContextType | null>(null);

export const AlertBoxContextProvider = (props: ContextProviderProps) => {

    const [alertBox, setAlertBox] = useState<string | null>(null);
    const [alertBoxType, setAlertBoxType] = useState<string | null>(null);

  return (
    <AlertBoxContext.Provider value={{ alertBox, setAlertBox, alertBoxType, setAlertBoxType }}>
        {props.children}
    </AlertBoxContext.Provider>
    )
}