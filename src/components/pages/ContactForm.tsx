import presentationData from '../../datas/presentation.json';
import { LangContext } from '../utils/context/LangProvider';
import { useContext } from 'react';
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
    
    const {register, handleSubmit} = useForm<Form>();

    const onSubmit = (data: Form) => {
        fetch('https://api.cedric-guette.com/api/mailto/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
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
                </div>
                <div className='email'>
                <label htmlFor='email'>{ presentation().email }:</label>
                    <input 
                    {...register('email')}
                    type='text' className='formControle' id='email' name='email'/>
                </div>
                <div className='request'>
                <label htmlFor='request'>{ presentation().question }:</label>
                    <textarea
                    {...register('request')}
                    className='formControle' id='request' name='request'/>
                </div>
                    <div className='button-form'><button>{ presentation().send }</button></div>

            </div>
        </form>
    )
}

export default ContactForm;
