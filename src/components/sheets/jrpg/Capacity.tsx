import { useState, useLayoutEffect } from 'react';
import { useContext } from 'react';
import { Weapon, defineDefaultWeapon } from '../../utils/context/WeaponProvider';


interface CapacityProps {
    image: string;
    name: string;
    value: string;
    id: string;
}

function Capacity(props : CapacityProps) {

    const weaponContext = useContext(Weapon); 

    const weapon = weaponContext?.capacities ? weaponContext.capacities[0] : defineDefaultWeapon();

    const valueToClassName = () => {
        switch (props.value) {
            case '05':
                return 'bar five';
            case '10':
                return 'bar ten'
            case '15':
                return 'bar fiveteen'
            case '20':
                return 'bar twenty'
            case '25':
                return 'bar twenty-five'
            default:
                return 'bar zero';
        }
    }

    const [weaponCapacity, setWeaponCapacity] = useState(false);

    useLayoutEffect(() => {
        for(let i = 0; i < weapon.length ; i++) {
            if(weapon[i] === parseInt(props.id)){
                setWeaponCapacity(true);
                return
            } else {
                setWeaponCapacity(false);
            }
        }
    }, [props.id, weapon])

    return(
        <div className={ weaponCapacity === true ? 'capacity active' : 'capacity'}>
            <img src={process.env.REACT_APP_BACKEND_URL + props.image } alt={ props.name } />
            <span className="valueName">{ props.name }</span><div className={ valueToClassName() }></div><span className="value">{ props.value }/25</span>
        </div>
    )

}

export default Capacity;
