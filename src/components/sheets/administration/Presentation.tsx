import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { PresentationType } from "../../../datas/presentation";
import PresentationPanel from "./PresentationPanel";
import { AdminPresentationContext } from "../../utils/context/AdminPresentationProvider";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";


function Presentation() {

    // On importe les contextes pour traiter les éléments
    const adminPresentation = useContext(AdminPresentationContext);
    const alertBox =  useContext(AlertBoxContext);

    // On utilise un useState pour traiter les textes à modifier
    const [presentation, setPresentation] = useState<Array<PresentationType>>([{
        "id": 0,
        "firstTitle": "",
        "firstText": "",
        "secondTitle": "",
        "secondText": "",
        "thirdTitle": "",
        "thirdText": ""
    },
    {
        "id": 1,
        "firstTitle": "",
        "firstText": "",
        "secondTitle": "",
        "secondText": "",
        "thirdTitle": "",
        "thirdText": ""
    },
    {
        "id": 2,
        "firstTitle": "",
        "firstText": "",
        "secondTitle": "",
        "secondText": "",
        "thirdTitle": "",
        "thirdText": ""
    }]);

    // On utilise une variable pour afficher le chevron
    const openClose = ">";

    // On crée une useState pour gérer l'ouverture et la fermeture du panneau
    const [openCloseState, setOpenCloseState] = useState(false);

    // On crée une fonction pour gérer l'ouverture et la fermeture
    const handleOpenClose = () => {
        setOpenCloseState(!openCloseState);
    }

    // On crée une useState pour gérer le chargement
    const [loading, setLoading] = useState(true);

    // On récupère les informations depuis le serveur
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/presentation`,
            {
            method : "GET",
        }) 
        .then((response) => response.json())
        .then((data) => {
            setPresentation(data);
            adminPresentation?.setAdminPresentation(data);
            setLoading(false);
        })
        .catch((error) => {
            alertBox?.setAlertBoxType(null);
            alertBox?.setAlertBox(error.toString());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertBox]);

    // On crée la fonction qui va se charger de requêter la modification
    const onClick = async () => {
        const body = JSON.stringify(adminPresentation?.adminPresentation);
        let requestIsOk = false;
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/presentation/update`, {
                method: "PUT",
                headers : { 
                    "Content-Type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value,
                },
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
                    alertBox?.setAlertBox(data.updated);
                } else {
                    alertBox?.setAlertBoxType("error");
                    alertBox?.setAlertBox(data.error);
                }
            });
        } catch (error) {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error as string);
        }
    }

    if(loading) {
        return <div>Loading</div>
    } else if(!loading && openCloseState === true){

        return (
            <div className="admin-panel">            
                <h2>Présentation</h2>
                <div onClick={handleOpenClose} className="openClose"> {openClose} </div>
                <div className="admin-categories">
                    <h3>Français:</h3>
                    <div className="presentation">
                        <PresentationPanel title={presentation[0].firstTitle} text={presentation[0].firstText} idText={1} idLanguage={presentation[0].id} />
                        <PresentationPanel title={presentation[0].secondTitle} text={presentation[0].secondText} idText={2} idLanguage={presentation[0].id} />
                        <PresentationPanel title={presentation[0].thirdTitle} text={presentation[0].thirdText} idText={3} idLanguage={presentation[0].id} />
                    </div>
                    <h3>Anglais:</h3>
                    <div className="presentation">
                        <PresentationPanel title={presentation[1].firstTitle} text={presentation[1].firstText} idText={1} idLanguage={presentation[1].id} />
                        <PresentationPanel title={presentation[1].secondTitle} text={presentation[1].secondText} idText={2} idLanguage={presentation[1].id} />
                        <PresentationPanel title={presentation[1].thirdTitle} text={presentation[1].thirdText} idText={3} idLanguage={presentation[1].id} />
                    </div>
                    <h3>Portugais:</h3>
                    <div className="presentation">
                        <PresentationPanel title={presentation[2].firstTitle} text={presentation[2].firstText} idText={1} idLanguage={presentation[2].id} />
                        <PresentationPanel title={presentation[2].secondTitle} text={presentation[2].secondText} idText={2} idLanguage={presentation[2].id} />
                        <PresentationPanel title={presentation[2].thirdTitle} text={presentation[2].thirdText} idText={3} idLanguage={presentation[2].id} />
                    </div>
                    <button className="button-alert" onClick={onClick}>Modifier</button>
                </div>
            </div>
        )
    }

     else {

        return (
            <div className="admin-panel">            
                <h2>Présentation</h2>
                <div onClick={handleOpenClose} className="openCloseClose"> {openClose} </div>
            </div>
        )
    }
}

export default Presentation;