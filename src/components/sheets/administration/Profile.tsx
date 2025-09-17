import DevStat from "./DevStat";
import Weapon from "./Weapon";
import { useContext, useEffect, useState } from "react";
import { DevStatContextProvider } from "../../utils/context/DevStatProvider";
import { AdminWeaponContextProvider } from "../../utils/context/AdminWeaponContext";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import { DevStatType } from "../../../datas/devstat";

function Profile() {

    const openClose = ">";
    const [openCloseState, setOpenCloseState] = useState(false);
    const handleOpenClose = () => {
        setOpenCloseState(!openCloseState);
    }
    const alertBox = useContext(AlertBoxContext);

        const emptyDevStat =  {   
            "id":0,
            "abilityName": "",
            "abilityScore":0,
            "devstatIndex":0,
            "abilityLogo":""
        }

    const [devStat, setDevStat] = useState<Array<DevStatType>>([
        emptyDevStat
    ])

        // Appel API pour récupérer les éléments présents dans la base de données
    useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/devstat`,
            {
            method : "GET",
        }) 
        .then((response) => response.json())
        .then((data) => {
            setDevStat(data);
        })
        .catch((error) => {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        });

    }, [alertBox]);


    if(openCloseState === true) {
        return (
            <div className="admin-panel">
                <h2>Profil</h2>
                <div onClick={handleOpenClose} className="openClose"> {openClose} </div>

                <div className="admin-categories">
                    <DevStatContextProvider>
                        <DevStat props={devStat} />
                    </DevStatContextProvider>
                    <AdminWeaponContextProvider>
                        <Weapon props={devStat}/>
                    </AdminWeaponContextProvider>
                </div>
            </div>
        )
    } else {
        return (
            <div className="admin-panel">
                <h2>Profil</h2>
                <div onClick={handleOpenClose} className="openCloseClose"> {openClose} </div>
            </div>
        )
    }
}

export default Profile;