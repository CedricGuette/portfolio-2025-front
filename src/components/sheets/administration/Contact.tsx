import { useContext, useEffect, useState } from "react";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import { ContactFormType } from "../../../datas/ContactForm";
import ContactSample from "./ContactSample";
import { AdminLoggedContext } from "../../utils/context/AdminLoggedProvider";

function Contact(){

    const alertBox = useContext(AlertBoxContext);
    const adminLogged = useContext(AdminLoggedContext);

    const emptyContactForm = {
        "id": 0,
        "senderName": "",
        "senderMail": "",
        "message": ""
    };

    const [contactForm, setContactForm] = useState<Array<ContactFormType>>([
        emptyContactForm
    ]);

    // On crée une requête pour récupérer les informations

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`,
            {
            method : "GET",
            headers: {
                "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value,
            }
        }) 
        .then((response) => {
            if(response.status === 403 && adminLogged?.isLogged === true){
                adminLogged?.setIsLogged(false);
            }
            return response.json()
        })
        .then((data) => {
            setContactForm(data);
        })
        .catch((error) => {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertBox]);

    return(
        <div className="admin-panel">
            <h2>Contact</h2>
            <div className="contact-sub-panel">
                {contactForm.length > 0 ? contactForm.map((data, index) => (
                    <ContactSample props={data} key={index} />
                    )
                ) : <div className="no-new-message">Il n'y a actuellement pas de nouveau message pour vous.</div>} 
            </div>
        </div>
    )
}

export default Contact;