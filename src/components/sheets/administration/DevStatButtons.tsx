import { useContext } from "react";
import { DevStatContext } from "../../utils/context/DevStatProvider";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import { DevStatType } from "../../../datas/devstat";

function DevStatButtons({image, emptyDevStat}:{image: File | null, emptyDevStat: DevStatType}) {

    // On importe les contextes pour le bon fonctionnement des bouttons
    const alertBox = useContext(AlertBoxContext);
    const devStatContext = useContext(DevStatContext);

    // Variable pour afficher le chevron
    const topBottom = "<";

    // On crée le fonctionnement globale du requêtage pour éviter les répétitions
    const apiRequest = async (url: string, method: string, headers: HeadersInit | undefined, body: string | Blob | undefined) =>{
        if(devStatContext !== null){
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
                            devStatContext?.setIsCreating(false);
                            devStatContext?.setDevStat(emptyDevStat);
                            alertBox?.setAlertBox(data.created);
                        } else if(method === "DELETE"){
                            alertBox?.setAlertBox(data.deleted);

                            let existingWeapon = devStatContext.devStats;
                            const index = existingWeapon.findIndex(object => object.id === devStatContext.devStat.id);
                            existingWeapon?.splice(index, 1);

                            devStatContext.setFocused(0);
                            devStatContext.setDevStats(existingWeapon);
                            devStatContext.setDevStat(emptyDevStat);
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

    // On crée un élément vide avec un id de 0 pour le modifier avant de l'envoyer au back
    const handleCreateNewDevStat = () => {
        if(devStatContext !== null){
            let existingDevStats = devStatContext.devStats;
            if(devStatContext !== null && devStatContext?.devStat.id === 0){
                existingDevStats.push(devStatContext.devStat);
            } else {
                existingDevStats.push(emptyDevStat);
                devStatContext?.setDevStat(emptyDevStat);
            }
            devStatContext.setDevStats(existingDevStats);
            devStatContext.setFocused(0);
            devStatContext.setIsCreating(true);
        }

    }

    // On vérifie les entrées du formulaire avant la création d'un nouvel élément
    const handleVerificationBeforeSubmit = () => {
        if(devStatContext?.devStat.abilityName === ""){
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez écrire un titre.");
        } else if(image === null) {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez ajouter une image.")
        } else {
            handleSendNewDevStat();
        }
    }

    // élément qui formera le corps des requêtes
    const body = JSON.stringify({
        "abilityName": devStatContext?.devStat.abilityName,
        "abilityScore": devStatContext?.devStat.abilityScore
    })

    // On crée un objet Blob pour le fichier image
    const blob = new Blob([body], { type: "application/json" });
    const formData:any = new FormData();
    formData.append("devStat", blob);
    formData.append("image", image);

    // Fonction pour envoyer la requête au back et créer de manière persistante le nouvel élément
    const handleSendNewDevStat = async () => {
        if(devStatContext !== null && devStatContext.devStat.id === 0) {
            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/devstat/create`,
                "POST",
                { 
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                },
                formData
            )
        }
    }

    // Fonction pour supprimer le nouvel élément avant l'envoie au back 
    const handleDeleteNewDevStat = () => {
        if(devStatContext !== null){
            let existingDevStats = devStatContext.devStats;
            existingDevStats.pop();
            devStatContext.setDevStats(existingDevStats);
            devStatContext.setIsCreating(false);
            devStatContext.setDevStat(emptyDevStat);
        }
    }

    //Fonction pour supprimer un élément 
    const handleDeleteExistingDevStat = async () => {
        if(devStatContext !== null && devStatContext?.focused !== null) {
            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/devstat/${devStatContext.devStat.id}`,
                "DELETE",
                { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                },
                undefined
            )
        }
    }

    //Fonction pour mettre à jour un élément 
    const handleUpdateDevStat = async () => {
        if(devStatContext !== null && devStatContext?.focused !== null) {
            if(image === null){
                apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/devstat/${devStatContext.devStat.id}`,
                    "PUT",
                    { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                    },
                    body
                )
            } else {
                apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/devstat/image/${devStatContext.devStat.id}`,
                    "PUT",
                    { 
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                    },
                    formData
                )
            }
        }
    }

    //Fonction pour monter un élément dans la liste
    const handleElementToTop = async () => {
        if(devStatContext !== null && devStatContext?.focused !== null) {

            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/devstat/movetop/${devStatContext.devStat.id}`,
                "PUT",
                { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                },
                undefined
            )
        }
    }

    //Fonction pour déscendre un élément dans la liste
    const handleElementToBottom = async () => {
        if(devStatContext !== null && devStatContext?.focused !== null) {

            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/devstat/movebottom/${devStatContext.devStat.id}`,
                "PUT",
                { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                },
                undefined
            )
        }
    }

    return(
        <div className="button-field">
            {devStatContext?.isCreating ? (
                <button className="button-alert" onClick={handleVerificationBeforeSubmit}>Créer</button>
            ) : (
                <button className="button-alert" onClick={handleCreateNewDevStat}>Nouveau</button>
            )}
            <button className="button-alert" onClick={handleUpdateDevStat}>Modifier</button>
            {devStatContext?.isCreating ? (
                <button className="button-alert delete" onClick={handleDeleteNewDevStat}>Supprimer</button>
            ) : (
                <button className="button-alert delete" onClick={handleDeleteExistingDevStat}>Supprimer</button>
            )}
            {devStatContext?.devStat.id === 0 ? "" : (devStatContext?.devStat.devstatIndex === 0 ? "" : <button className="button-alert" onClick={handleElementToTop}><div className="top">{topBottom}</div></button>)}
            {devStatContext?.devStat.id === 0 ? "" : (devStatContext?.devStat.devstatIndex === (devStatContext === null ? 0 : devStatContext?.devStats.length - 1) ? "" : <button className="button-alert" onClick={handleElementToBottom}><div className="bottom">{topBottom}</div></button>)}
        </div>
    )
}

export default DevStatButtons;