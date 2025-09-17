import { useContext } from "react";
import { ContactFormType } from "../../../datas/ContactForm";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";

function ContactSample({props}: {props: ContactFormType}){

    const alertBox = useContext(AlertBoxContext);

    //Fonction pour supprimer un élément 
    const handleDeleteExistingContactMessage = async () => {
        let requestIsOk = false;
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact/delete/${props.id}`, {
                method: "DELETE",
                headers : { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value,
                }
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
                    alertBox?.setAlertBox(data.deleted);
                    
                } else {
                    alertBox?.setAlertBoxType("error");
                    alertBox?.setAlertBox(data.error);
                }
            });
        } catch (error: any) {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        }
    }

    return(
        <div className="contact-message">
            {`Nom de l'expéditeur: ${props.senderName}\n\n E-mail de l'expéditeur: ${props.senderMail} \n\n son message:\n`}
            <div className="message-field">
                    {props.message}
            </div>
            <div className="button-field">
                <button className="button-alert delete" onClick={handleDeleteExistingContactMessage}>Supprimer</button>
            </div>
        </div>
    )
}

export default ContactSample;