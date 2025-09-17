import { useContext, useState } from "react";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";

function ChangePassword(){

    const alertBox = useContext(AlertBoxContext);

    // On gère l'ouverture et la fermeture de la sous-catégorie
    const openClose = ">";
    const [openCloseState, setOpenCloseState] = useState(false);
    const handleOpenClose = () => {
        setOpenCloseState(!openCloseState);
    }

    // UseState pour gérer les entrées dans le formulaire
    const [form, setForm] = useState({
        actualPassword: "",
        password: "",
        confirmPassword: ""
    });

    // Fonction pour gérer les entrées dans le formulaire
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    // On crée le corps de la requête
    const body = {
        password: form.actualPassword,
        newPassword: form.password
    }

    // On vérifer que le mot de passe et sa confirmation sont identiques
    const verifyPasswordConfirmation = () =>{
        if(form.password === form.confirmPassword){
            return true;
        } else {
            return false;
        }
    }

    // Fonction pour gérer l'envoie de la requête
    const onSubmit = () => {
        if(verifyPasswordConfirmation()){
            let requestIsOk = false;
            try{
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/password/change`,{
                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                    },
                    body: JSON.stringify(body)
                })
                .then((response) =>{
                    requestIsOk = response.ok;
                    return response.json()
                })
                .then((data) =>{
                    if(requestIsOk){
                        alertBox?.setAlertBoxType("success");
                        alertBox?.setAlertBox(data.updated);
                    } else {
                        alertBox?.setAlertBoxType("error");
                        alertBox?.setAlertBox(data.error);
                    }
                });
            } catch(error: any){
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString())
            }
        } else {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Le mot de passe et sa confirmation ne correspondent pas.");
        }
    }
    if(openCloseState === true){
        return(
            <div className="admin-panel">
            <h2>Changer de mot de passe</h2>
                <div onClick={handleOpenClose} className="openCloseClose"> {openClose} </div>
                <div className="sub-panel">
                    <form className="login-form change">
                        <div className="sub-form-solo">
                            <div className="login-sub-panel">
                                <label>Mot de passe actuel: </label>
                                <input type="password" name="actualPassword" onChange={handleChange} required/>
                                <label>Nouveau mot de passe: </label>
                                <input type="password" name="password" onChange={handleChange} required/>
                                <label>Confirmer le mot de passe: </label>
                                <input type="password" name="confirmPassword" onChange={handleChange} required/>
                            </div>
                        </div>
                        <button className="button-alert" type="button" onClick={onSubmit}>Envoyer</button>
                    </form>
                </div>
            </div>
        )
    } else {
        return(
            <div className="admin-panel">
            <h2>Changer de mot de passe</h2>
            <div onClick={handleOpenClose} className="openCloseClose"> {openClose} </div>
            </div>
        )
    }

}

export default ChangePassword;