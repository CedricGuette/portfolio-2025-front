import { createContext, useState } from 'react';

type WeaponContextType = {
    capacities: [Array<number>, number] | null;
    setCapacities: React.Dispatch<React.SetStateAction<[Array<number>, number] | null>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const Weapon = createContext<WeaponContextType | null>(null);

export const WeaponProvider = (props: ContextProviderProps) => {

    const[capacities, setCapacities] = useState< [Array<number>, number] | null>(null)

  return (
    <Weapon.Provider value={{ capacities, setCapacities }}>
        {props.children}
    </Weapon.Provider>
    )
}

export const defineDefaultWeapon = () => {
    return [[], 0]
}
