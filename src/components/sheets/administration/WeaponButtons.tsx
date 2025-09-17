import { useContext } from "react";
import { AdminWeaponContext } from "../../utils/context/AdminWeaponContext";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import { WeaponType } from "../../../datas/WeaponType";

function WeaponButtons({image, emptyWeapon}: {image: File | null, emptyWeapon: WeaponType}) {

    // On importe les contextes utiles au bon fonctionnement 
    const alertBox = useContext(AlertBoxContext);
    const adminWeaponContext = useContext(AdminWeaponContext);

    // On vérifie les entrées du formulaire avant la création d'un nouvel élément
    const handleVerificationBeforeSubmit = () => {
        if(adminWeaponContext?.adminWeapon.weaponDescriptionFrench === ""){
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez écrire un titre en français.");
        } else if(adminWeaponContext?.adminWeapon.weaponDescriptionEnglish === ""){
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez écrire un titre en anglais.");
        } else if(adminWeaponContext?.adminWeapon.weaponDescriptionPortuguese === ""){
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez écrire un titre en portugais.");
        } else if(image === null) {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez ajouter une image.")
        } else {
            handleSendNewWeapon();
        }
    }

    // On crée le corps des requêtes
    const body = JSON.stringify({
        "weaponIsObtained": adminWeaponContext?.adminWeapon.weaponIsObtained,
        "weaponDescriptionFrench": adminWeaponContext?.adminWeapon.weaponDescriptionFrench,
        "weaponDescriptionEnglish": adminWeaponContext?.adminWeapon.weaponDescriptionEnglish,
        "weaponDescriptionPortuguese": adminWeaponContext?.adminWeapon.weaponDescriptionPortuguese,
        "devstatUpgraded": adminWeaponContext?.adminWeapon.devstatUpgraded
    })

    // On crée un objet Blob pour le fichier image
    const blob = new Blob([body], { type: "application/json" });
    const formData:any = new FormData();
    formData.append("weapon", blob);
    formData.append("image", image);

    // On crée le fonctionnement globale du requêtage pour éviter les répétitions
    const apiRequest = async (url: string, method: string, headers: HeadersInit | undefined, body: string | Blob | undefined) =>{
        if(adminWeaponContext !== null){
            let requestIsOk = false;
            try {
                await fetch(url, {
                    method: method,
                    headers : headers,
                    body: body
                })
                .then((res) =>  {
                    if(res.ok === true) {
                        requestIsOk = true;
                    }
                    return res.json()
                })
                .then((data) => {
                    if(requestIsOk === true) {

                        alertBox?.setAlertBoxType("success");

                        if(method === "POST"){
                            adminWeaponContext?.setIsCreating(false);
                            adminWeaponContext?.setAdminWeapon(emptyWeapon);
                            alertBox?.setAlertBox(data.created);
                        } else if(method === "DELETE"){
                            alertBox?.setAlertBox(data.deleted);

                            let existingWeapon = adminWeaponContext.weapons;
                            const index = existingWeapon.findIndex(object => object.id === adminWeaponContext.adminWeapon.id);
                            existingWeapon?.splice(index, 1);

                            adminWeaponContext.setFocusedWeapon(0);
                            adminWeaponContext.setWeapons(existingWeapon);
                            adminWeaponContext.setAdminWeapon(emptyWeapon);
                        } else {
                            alertBox?.setAlertBox(data.updated);
                        }
                    } else {
                        alertBox?.setAlertBoxType("error");
                        alertBox?.setAlertBox(data.error);
                    }
                });
            } catch (error: any) {
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString());
            }
        }  else {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Le contexte n'est pas correctement chargé.");
        }
    }

    // Fonction pour envoyer la requête au back et créer de manière persistante le nouvel élément
    const handleSendNewWeapon = async () => {
        if(adminWeaponContext !== null && adminWeaponContext.adminWeapon.id === 0){
            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/weapon/create`,
                "POST",
                {"Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value},
                formData
            );
        }
    }

    //Fonction pour supprimer un élément 
    const handleDeleteExistingWeapon = async () => {
        if(adminWeaponContext !== null && adminWeaponContext?.focusedWeapon !== null) {
            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/weapon/${adminWeaponContext.adminWeapon.id}`,
               "DELETE",
                {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value,
                },
                undefined
            );
        }
    }

    //Fonction pour mettre à jour un élément 
    const handleUpdateWeapon = async () => {
        if(adminWeaponContext !== null && adminWeaponContext?.focusedWeapon !== null) { 
            if(image === null){
                apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/weapon/${adminWeaponContext.adminWeapon.id}`,
                    "PUT",
                    { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value,
                    },
                    body  
                );
            } else {
                apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/weapon/image/${adminWeaponContext.adminWeapon.id}`,
                    "PUT",
                    { 
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value,
                    },
                    formData 
                );
            }
        }
    }

    // On crée un élément vide avec un id de 0 pour le modifier avant de l'envoyer au back
    const handleCreateNewWeapon = () => {
            if(adminWeaponContext !== null){
            let existingWeapon = adminWeaponContext.weapons;

            if(adminWeaponContext !== null && adminWeaponContext.adminWeapon.id === 0) {
                existingWeapon.push(adminWeaponContext.adminWeapon);
            } else {
                existingWeapon.push(emptyWeapon);
                adminWeaponContext.setAdminWeapon(emptyWeapon);
            }

            adminWeaponContext.setWeapons(existingWeapon);
            adminWeaponContext.setFocusedWeapon(0);
            adminWeaponContext.setIsCreating(true);
        }
    }

    // Fonction pour supprimer le nouvel élément avant l'envoie au back 
    const handleDeleteWeapon = () => {
        if(adminWeaponContext !== null){
            let existingWeapon = adminWeaponContext.weapons;
            existingWeapon.pop();
            adminWeaponContext.setWeapons(existingWeapon);
            adminWeaponContext?.setIsCreating(false);
            adminWeaponContext?.setAdminWeapon(emptyWeapon);
        }
    }

    return(
        <div className="button-field">
            {adminWeaponContext?.isCreating ? (
                <button className="button-alert" onClick={handleVerificationBeforeSubmit}>Créer</button>
            ) : (
                <button className="button-alert" onClick={handleCreateNewWeapon}>Nouveau</button>
            )}
            <button className="button-alert" onClick={handleUpdateWeapon}>Modifier</button>
            {adminWeaponContext?.isCreating ? (
                <button className="button-alert delete" onClick={handleDeleteWeapon}>Supprimer</button>
            ) : (
                <button className="button-alert delete" onClick={handleDeleteExistingWeapon}>Supprimer</button>
            )}
        </div>
    )
}

export default WeaponButtons;