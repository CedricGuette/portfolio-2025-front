import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import { AdminWeaponContext } from "../../utils/context/AdminWeaponContext";
import WeaponSample from "./WeaponSample";
import { DevStatType } from "../../../datas/devstat";
import WeaponButtons from "./WeaponButtons";

function Weapon({props}: {props: Array<DevStatType>}) {

    // Contexte pour gérer l'affichage des boites de dialogues
    const alertBox = useContext(AlertBoxContext);

    // Contexte pour gérer l'ensemble des éléments
    const adminWeaponContext = useContext(AdminWeaponContext);

    // UseState pour forcer le rendu en fin de chaine
    const [forceRender, setForceRender] = useState(true);

    // Elément Weapon vide par défaut
    const emptyWeapon = {
        "id": 0,
        "weaponLogo": "newlogo.png",
        "weaponIsObtained": false,
        "weaponDescriptionFrench": "",
        "weaponDescriptionEnglish": "",
        "weaponDescriptionPortuguese": "",
        "devstatUpgraded": []
    };

    // On crée le useState pour gérer l'upload de l'image
    const [image, setImage] = useState<File | null>(null);

    // UseState et fonction pour réinitialiser l'input d'upload de fichier quand on change de sélection
    const [keyInput, setKeyInput] = useState("");

    // On crée une fonction qui va changer le key de l'input pour upload l'image afin de le réinitialiser
    const emptyImage = () => {
        let randomString = Math.random().toString(36);
        setKeyInput(randomString);
        setImage(null);
    }

    // On crée une requête pour récupérer les informations
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/weapon`,
            {
            method : "GET",
        }) 
        .then((response) => response.json())
        .then((data) => {
            adminWeaponContext?.setWeapons(data);
        })
        .catch((error) => {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertBox]);

    // Fonctions pour gérer les entrées dans les champs
    const handleFrenchName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(adminWeaponContext !== null) {
            let newWeapon = adminWeaponContext.adminWeapon;
            newWeapon.weaponDescriptionFrench = event.target.value;
            adminWeaponContext.setAdminWeapon(newWeapon);
            setForceRender(!forceRender);
        } 
    }

    const handleEnglishName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(adminWeaponContext !== null) {
            let newWeapon = adminWeaponContext.adminWeapon;
            newWeapon.weaponDescriptionEnglish = event.target.value;
            adminWeaponContext.setAdminWeapon(newWeapon);
            setForceRender(!forceRender);
        } 
    }

    const handlePortugueseName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(adminWeaponContext !== null) {
            let newWeapon = adminWeaponContext.adminWeapon;
            newWeapon.weaponDescriptionPortuguese = event.target.value;
            adminWeaponContext.setAdminWeapon(newWeapon);
            setForceRender(!forceRender);
        } 
    }

    const handleIsObtained = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(adminWeaponContext !== null) {
            let newWeapon = adminWeaponContext.adminWeapon;
            newWeapon.weaponIsObtained = event.target.checked;
            adminWeaponContext.setAdminWeapon(newWeapon);
            setForceRender(!forceRender);
        } 
    }

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            setImage(event.target.files[0]);
        }
    }

    // Fonction qui va permettre de maintenir le rendu quand on crée un nouvel élément dans la liste
    const maintainRender = () => {
        if(adminWeaponContext?.isCreating && adminWeaponContext !== null && adminWeaponContext?.weapons[adminWeaponContext?.weapons.length -1].id !== 0){
            let renderMaintained = adminWeaponContext.weapons;
            renderMaintained.push(adminWeaponContext.adminWeapon);
            return renderMaintained;
        } else {
            if(adminWeaponContext !== null){
                return adminWeaponContext?.weapons;
            } else {
                return [emptyWeapon];
            }
        }
    }

    // On crée une fonction qui va gérer l'array des compétences liées à l'arme avant de l'envoyer dans la requête
    const handleDevStatInput = (id: number) => (e: any) =>{
        function ascNumbers (a: number, b: number){
            return a - b;
        }
        if(adminWeaponContext !== null){
            let contextToUpdate = adminWeaponContext?.adminWeapon;

            if(contextToUpdate.devstatUpgraded.includes(id)){
                let arrayIndexOfId = contextToUpdate.devstatUpgraded.indexOf(id);
                if(arrayIndexOfId >= 0){
                    contextToUpdate.devstatUpgraded.splice(arrayIndexOfId, 1);
                    adminWeaponContext.setAdminWeapon(contextToUpdate);
                }
            } else {
                contextToUpdate.devstatUpgraded.push(id);
                contextToUpdate.devstatUpgraded.sort(ascNumbers);
                adminWeaponContext.setAdminWeapon(contextToUpdate);
            }
            console.log(adminWeaponContext?.adminWeapon.devstatUpgraded)
            setForceRender(!forceRender);
        }
    }

    return (
        <div className="admin-sub-panel">
            <h3>Armes:</h3>
            <div className="weapon-box">
                <div className="weapon-list">
                    {maintainRender().map((data, index) => (
                        <div className="weapon-container" key={index} onClick={emptyImage}>
                            <WeaponSample prop={data} index={index} empty={emptyWeapon}/>
                        </div>
                        )
                    )} 
                </div>
                <div className="weapon-options">
                    <div>
                        <label>français:</label>
                        <input type="text" onChange={handleFrenchName} value={adminWeaponContext?.adminWeapon.weaponDescriptionFrench}></input>
                    </div>
                    <div>
                        <label>anglais:</label>
                        <input type="text" onChange={handleEnglishName} value={adminWeaponContext?.adminWeapon.weaponDescriptionEnglish}></input>
                    </div>
                    <div>
                        <label>portuguais:</label>
                        <input type="text" onChange={handlePortugueseName} value={adminWeaponContext?.adminWeapon.weaponDescriptionPortuguese}></input>
                    </div>
                    <div>
                        <label>logo:</label>
                        <input type="file" onChange={handleChangeImage} key={keyInput}/>
                    </div>
                    <div>
                        <label>obtenu?</label>
                        <input type="checkbox" onChange={handleIsObtained} defaultChecked={adminWeaponContext?.adminWeapon.weaponIsObtained}></input>
                    </div>
                    Compétences liées:
                    <div className="devstat-selector">
                        {props.map((data, index) =>(
                            <div key={"input" + index} className="devstat-input" >
                                {data.abilityName}
                                
                                <input type="checkbox" onChange={handleDevStatInput(data.id)} checked={adminWeaponContext?.adminWeapon.devstatUpgraded.includes(data.id)}></input> 
                            </div>
                        ))}
                    </div>
                        <WeaponButtons image={image} emptyWeapon={emptyWeapon} />
                </div>
            </div>
        </div>
    )
}

export default Weapon;