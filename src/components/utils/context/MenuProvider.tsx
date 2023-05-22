import { createContext, useState } from 'react';

type MenuContextType = {
    isOpen: [boolean, boolean] | null;
    setMenuOpen: React.Dispatch<React.SetStateAction<[boolean, boolean] | null>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const MenuIsOpen = createContext<MenuContextType | null>(null);

export const MenuProvider = (props: ContextProviderProps) => {

    const[isOpen, setMenuOpen] = useState< [boolean, boolean] | null>(null)

  return (
    <MenuIsOpen.Provider value={{ isOpen, setMenuOpen }}>
        {props.children}
    </MenuIsOpen.Provider>
    )
}

export const defineDefaultMenuIsOpen = () => {
    return [false, false]
}
