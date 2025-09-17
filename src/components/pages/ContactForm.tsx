import presentationData from '../../datas/presentation.json';
import { LangContext } from '../utils/context/LangProvider';
import { useContext, useState } from 'react';
import Navigation from '../layouts/Navigation';
import { AlertBoxContext } from '../utils/context/AlertBoxContext';

function ContactForm() {
    const languageContext = useContext(LangContext);
    const alertBox = useContext(AlertBoxContext);

    const presentation = () => {
        if(languageContext?.lang === 'EN'){
            return presentationData.en
        } else if(languageContext?.lang === 'PT'){
            return presentationData.pt
        } else {
            return presentationData.fr
        }
    }
    
    const [contactform, setContactForm] = useState({
        name: "",
        email: "",
        request: ""
    });

    // On met en place la fonction de changement d'état du formulaire
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setContactForm((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });
    };

    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);

    const errorSetter = (area: string, setter: Function) => {

        if(!area) {
            setter(true);
        } else {
            setter(false);
        }
    }

    const body = {
        senderName: contactform.name,
        senderMail: contactform.email,
        message: contactform.request
    }

    const onSubmit = () => {

        errorSetter(contactform.name, setErrorName);
        errorSetter(contactform.email, setErrorEmail);
        errorSetter(contactform.request, setErrorRequest);



        if((contactform.name && contactform.email) && contactform.request) {
            
            let requestIsOk = false;
            try{
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact/send`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type' : 'application/json'}
                })
                .then((response) => {
                    requestIsOk = response.status === 200;
                    return response.json();
                })
                .then((data) => {

                    if(requestIsOk) {
                        alertBox?.setAlertBoxType("success");
                        alertBox?.setAlertBox(data.sended);
                    } else {
                        alertBox?.setAlertBoxType("error");
                        alertBox?.setAlertBox(data.error);
                    }
                })
            }
            catch(error: any){
                    alertBox?.setAlertBoxType("error");
                    alertBox?.setAlertBox(error.toString());
            }
        }
    }

    return(
        <form className='form'>
            <Navigation section='contactform'/>
            <h2>{ presentation().title5 }</h2>
            <p>
                { presentation().content5 }
            </p>
            <div className="formInputs">
                <div className='name'>
                    <label htmlFor='name'>{ presentation().names }:</label>
                    <input
                    onChange={handleChange}
                    type='text' className='formControle' id='name' name='name'/>
                    { errorName ? ( <div className="error">{ presentation().errorname }</div> ) : null}
                </div>
                <div className='email'>
                <label htmlFor='email'>{ presentation().email }:</label>
                    <input 
                    onChange={handleChange}
                    type='text' className='formControle' id='email' name='email'/>
                    { errorEmail ? ( <div className="error">{ presentation().errormail }</div> ) : null}
                </div>
                <div className='request'>
                <label htmlFor='request'>{ presentation().question }:</label>
                    <textarea
                    onChange={handleChange}
                    className='formControle' id='request' name='request'/>
                    { errorRequest ? ( <div className="error requestArea">{ presentation().errorrequest }</div> ) : null}
                </div>
                    <div className='button-form'><button onClick={onSubmit} type="button">{ presentation().send }</button></div>
            </div>
        </form>
    )
}

export default ContactForm;
