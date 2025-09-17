import { LangContext } from '../../utils/context/LangProvider';
import { useContext } from 'react';
import Weapon from './Weapon';
import { PresentationSection } from '../../../datas/presentation';
import { useEffect } from 'react';
import { useState } from 'react';
import { AlertBoxContext } from '../../utils/context/AlertBoxContext';
import { WeaponType } from '../../../datas/WeaponType';

interface WeaponsProps {
    presentationData: PresentationSection;
}

function Weapons(props: WeaponsProps) {

    const languageContext = useContext(LangContext);

    const weaponLanguage = (weapon: WeaponType) => {
        if(languageContext?.lang === "EN"){
            return weapon.weaponDescriptionEnglish;
        } else if(languageContext?.lang === "PT"){
            return weapon.weaponDescriptionPortuguese;
        } else {
            return weapon.weaponDescriptionFrench;
        }
    }

    const weaponObtained = (weapon: WeaponType, index: number) => {
        if(weapon.weaponIsObtained) {
            return <Weapon key={`${ index } - weapon`} text={ weaponLanguage(weapon) } image={ weapon.weaponLogo } idList={ weapon.devstatUpgraded } id={ weapon.id } />
        }
    }

    const weaponNotObtained = (weapon: WeaponType, index: number) => {
        if(!weapon.weaponIsObtained) {
            return <Weapon key={`${ index } - weapon`} text={ weaponLanguage(weapon) } image={ weapon.weaponLogo } idList={ weapon.devstatUpgraded } id={ weapon.id } />
        }
    }

    const alertBox = useContext(AlertBoxContext);

        const emptyWeapon = {
        "id": 0,
        "weaponLogo": "newlogo.png",
        "weaponIsObtained": false,
        "weaponDescriptionFrench": "",
        "weaponDescriptionEnglish": "",
        "weaponDescriptionPortuguese": "",
        "devstatUpgraded": []
    };

    const [weapon, setWeapon] = useState<Array<WeaponType>>([
        emptyWeapon
    ]);

    // On crée une requête pour récupérer les informations

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/weapon`,
            {
            method : "GET",
        }) 
        .then((response) => response.json())
        .then((data) => {
            setWeapon(data);
        })
        .catch((error) => {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        });
    }, [alertBox]);

    return(
        <div className="equipment">
            <h3 className='smallBack'>{ props.presentationData.weapon }</h3> 
            <div className="weapons">
                    {(weapon.map((weapon, index) => (
                    weaponObtained(weapon, index)
                    )))}
            </div>
            <h3>{ props.presentationData.quest }</h3>
            <div className="weapons">
                {weapon.map((weapon, index) => (
                    weaponNotObtained(weapon, index)
                    )
                )}  
            </div>
        </div>
    )
}

export default Weapons;
