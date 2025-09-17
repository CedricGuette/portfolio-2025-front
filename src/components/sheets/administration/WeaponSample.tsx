import { WeaponType } from "../../../datas/WeaponType";
import { useContext } from "react";
import { AdminWeaponContext } from "../../utils/context/AdminWeaponContext";

function WeaponSample({prop, index, empty} : {prop: WeaponType, index: number, empty: WeaponType}) {

    // On importe le contexte pour gérer les éléments
    const adminWeaponContext = useContext(AdminWeaponContext);

    // On crée une fonction pour sélectionner les éléments
    const handleSelected = () => {
        if(adminWeaponContext?.adminWeapon.id === prop.id){
            adminWeaponContext?.setAdminWeapon(empty);
            adminWeaponContext?.setFocusedWeapon(empty.id);
        } else {
            adminWeaponContext?.setFocusedWeapon(prop.id);
            adminWeaponContext?.setAdminWeapon(prop);
        }
    }

    return(
        <div key={"weapon " + index} className={`weapon ${adminWeaponContext?.focusedWeapon === prop.id ? (prop.id === 0 ? "newSelected" : "selected") : ""}`} onClick={handleSelected}> 
        <div className="index-image">
            {index + 1} - 
            <img src={process.env.REACT_APP_BACKEND_URL + prop.weaponLogo} alt={"arme de la compétence " + prop.weaponDescriptionFrench} />
        </div>
        <div>
            <div>fr: {prop.weaponDescriptionFrench}</div>
            <div>en: {prop.weaponDescriptionEnglish}</div>
            <div>pt: {prop.weaponDescriptionPortuguese}</div>
        </div>
        { prop.weaponIsObtained ? "obtained" : "not obtained"}</div>
    )
}

export default WeaponSample;