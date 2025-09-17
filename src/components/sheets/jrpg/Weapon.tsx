import { useState, useContext, useEffect } from 'react';
import { Weapon as CapacityList, defineDefaultWeapon } from '../../utils/context/WeaponProvider';

interface WeaponProps {
    image: string;
    text: string;
    idList: Array<number>;
    id: number;
}


function Weapon(props: WeaponProps) {

    const weaponContext = useContext(CapacityList); 

    const weaponCapacities = weaponContext?.capacities ? weaponContext.capacities : defineDefaultWeapon();

    const [isSelected, setIsSelected] = useState(false);

    const handleSelected = (event: React.MouseEvent<HTMLElement>) => {
        if(weaponCapacities[1] === props.id){
            weaponContext?.setCapacities([[0], 0]);
        } else {
            weaponContext?.setCapacities([props.idList, props.id]);
        }
    }
    
    useEffect(() => {
        if(weaponCapacities[1] === props.id) {
            setIsSelected(true);
        } else {
            setIsSelected(false)
        }
    },[weaponCapacities, props.id])

    return(
        <div className={isSelected ? 'weapon active' : 'weapon'} onClick={ handleSelected }>
            <img src={process.env.REACT_APP_BACKEND_URL + props.image } alt='sword' />
            <span className="value">{ props.text }</span>
        </div>
    )
}

export default Weapon;
