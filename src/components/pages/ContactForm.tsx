import presentationData from '../../datas/presentation.json';
import { LangContext } from '../utils/context/LangProvider';
import { useContext, useState } from 'react';
import {useForm} from 'react-hook-form';
import Navigation from '../layouts/Navigation';

type Name = string;
type Email = string;
type Request = string;

type Form = {

    name: Name;
    email: Email;
    request: Request;
};

function ContactForm() {
    const languageContext = useContext(LangContext);

    const presentation = () => {
        if(languageContext?.lang === 'EN'){
            return presentationData.en
        } else if(languageContext?.lang === 'PT'){
            return presentationData.pt
        } else {
            return presentationData.fr
        }
    }
    
    const [responseWindow, setResponseWindow] = useState(false);
    const [responseForm, setResponseForm] = useState('');
    const {register, handleSubmit} = useForm<Form>();

    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);

    const handleCloseResponse = (event: React.MouseEvent<HTMLElement>) => {
        setResponseWindow(false);
    }

    const errorSetter = (area: string, setter: Function) => {

        if(!area) {
            setter(true);
        } else {
            setter(false);
        }
    }

    const onSubmit = (data: Form) => {

        errorSetter(data.name, setErrorName);
        errorSetter(data.email, setErrorEmail);
        errorSetter(data.request, setErrorRequest);

        if((data.name && data.email) && data.request) {
            
            fetch('https://cedric-guette.com/api/mailto/send', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type' : 'application/json'}
            })
            .then(response => {
                setResponseWindow(true);
                setResponseForm(response.status + ' ' + response.statusText );
                // console.log(response);
            })
            .catch(error => {
                setResponseWindow(true);
                setResponseForm(error.status + ' ' + error.statusText );
                // console.log(error);
            })
        }
    }

    return(
        <form className='form' onSubmit={ handleSubmit(onSubmit) }>
            <Navigation section='contactform'/>
            <h2>{ presentation().title5 }</h2>
            <p>
                { presentation().content5 }
            </p>
            <div className="formInputs">
                <div className='name'>
                    <label htmlFor='name'>{ presentation().names }:</label>
                    <input
                    {...register('name')}
                    type='text' className='formControle' id='name' name='name'/>
                    { errorName ? ( <div className="error">{ presentation().errorname }</div> ) : null}
                </div>
                <div className='email'>
                <label htmlFor='email'>{ presentation().email }:</label>
                    <input 
                    {...register('email')}
                    type='text' className='formControle' id='email' name='email'/>
                    { errorEmail ? ( <div className="error">{ presentation().errormail }</div> ) : null}
                </div>
                <div className='request'>
                <label htmlFor='request'>{ presentation().question }:</label>
                    <textarea
                    {...register('request')}
                    className='formControle' id='request' name='request'/>
                    { errorRequest ? ( <div className="error requestArea">{ presentation().errorrequest }</div> ) : null}
                </div>
                    <div className='button-form'><button>{ presentation().send }</button></div>
            </div>
            {responseWindow === true ? (<div className="response">
                <div className="window">
                    <span className='text'>{ responseForm }</span>
                    <button onClick={ handleCloseResponse }> Fermer </button>
                </div>
            </div>) : null}
        </form>
    )
}

export default ContactForm;
