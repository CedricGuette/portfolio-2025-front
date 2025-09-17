import { useContext, useState } from "react";
import { AlertBoxContext } from "../utils/context/AlertBoxContext";

function FirstLogin({username}: {username: string}){

    const alertBox = useContext(AlertBoxContext);

    const [form, setForm] = useState({
        username: username,
        temporaryPassword: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const body = {
        username: form.username,
        temporaryPassword: form.temporaryPassword,
        password: form.password
    }

    const verifyPasswordConfirmation = () =>{
        if(form.password === form.confirmPassword){
            return true;
        } else {
            return false;
        }
    }

    const onSubmit = () => {
        if(verifyPasswordConfirmation()){
            let requestIsOk = false;
            try{
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/password/initiate`,{
                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json"
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

    return(
        <form className="login-form row">
            <div className="sub-form">
                <div className="login-sub-panel">
                    <label>Identifiant: </label>
                    <input type="text" name="username" onChange={handleChange} value={form.username} required/>
                    <label>Mot de passe temporaire: </label>
                    <input type="password" name="temporaryPassword" onChange={handleChange} required/>
                </div>
                <div className="login-sub-panel">
                    <label>Nouveau mot de passe: </label>
                    <input type="password" name="password" onChange={handleChange} required/>
                    <label>Confirmer le mot de passe: </label>
                    <input type="password" name="confirmPassword" onChange={handleChange} required/>
                </div>
            </div>
            <button className="button-alert" type="button" onClick={onSubmit}>Envoyer</button>
        </form>
    )
}

export default FirstLogin;