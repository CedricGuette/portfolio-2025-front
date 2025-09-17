import { createContext, useState } from 'react';
import { WeaponType } from '../../../datas/WeaponType';

type AdminPresentationContextType = {
    adminWeapon: WeaponType;
    setAdminWeapon: React.Dispatch<React.SetStateAction<WeaponType>>;
    weapons: Array<WeaponType>;
    setWeapons: React.Dispatch<React.SetStateAction<Array<WeaponType>>>;
    focusedWeapon: number | null;
    setFocusedWeapon: React.Dispatch<React.SetStateAction<number | null>>
    isCreating : boolean;
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

const emptyWeapon = {
    "id": 0,
    "weaponLogo": "newlogo.png",
    "weaponIsObtained": false,
    "weaponDescriptionFrench": "",
    "weaponDescriptionEnglish": "",
    "weaponDescriptionPortuguese": "",
    "devstatUpgraded": []
};

export const AdminWeaponContext = createContext<AdminPresentationContextType | null>(null);

export const AdminWeaponContextProvider = (props: ContextProviderProps) => {

    const [adminWeapon, setAdminWeapon] = useState<WeaponType>(emptyWeapon);

    const [weapons, setWeapons] = useState<Array<WeaponType>>([emptyWeapon]);
    const [focusedWeapon, setFocusedWeapon] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <AdminWeaponContext.Provider value={{ adminWeapon, setAdminWeapon, weapons, setWeapons, focusedWeapon, setFocusedWeapon , isCreating, setIsCreating }}>
        {props.children}
    </AdminWeaponContext.Provider>
    )
}