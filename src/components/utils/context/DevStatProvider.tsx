import { createContext, useState } from 'react';
import { DevStatType } from '../../../datas/devstat';

type AdminPresentationContextType = {
    devStats: Array<DevStatType>;
    setDevStats: React.Dispatch<React.SetStateAction<Array<DevStatType>>>;
    devStat: DevStatType;
    setDevStat: React.Dispatch<React.SetStateAction<DevStatType>>;
    isCreating: boolean;
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
    focused: number | null;
    setFocused: React.Dispatch<React.SetStateAction<number | null>>
}

type ContextProviderProps = {
    children: JSX.Element;
}

const emptyDevStat = {
            "id":0,
            "abilityName": "",
            "abilityScore":0,
            "devstatIndex": 0,
            "abilityLogo":""
        };

export const DevStatContext = createContext<AdminPresentationContextType | null>(null);

export const DevStatContextProvider = (props: ContextProviderProps) => {

    const [devStats, setDevStats] = useState<Array<DevStatType>>([emptyDevStat]);
    const [devStat, setDevStat] = useState<DevStatType>(emptyDevStat);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [focused, setFocused] = useState<number | null>(null);

  return (
    <DevStatContext.Provider value={{ devStats, setDevStats, devStat, setDevStat, isCreating, setIsCreating, focused, setFocused }}>
        {props.children}
    </DevStatContext.Provider>
    )
}