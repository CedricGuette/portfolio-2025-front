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
    
    const {register, handleSubmit} = useForm<Form>();

    const onSubmit = (data: Form) => {
        fetch('http://api.cedric-guette.com:3006/api/mailto/send', {
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
            <h2>Des questions?</h2>
            <p>Je m'éforcerais de vous répondre dans les plus bref délais. <br/>
                Vous pouvez m'écrire à cette adresse : contact@cedric-guette.com <br/><br/>
                Ou alors vous pouvez remplir ce formulaire :
            </p>
            <div className="formInputs">
                <div className='name'>
                    <label htmlFor='name'>Vos nom et prénom:</label>
                    <input
                    {...register('name')}
                    type='text' className='formControle' id='name' name='name'/>
                </div>
                <div className='email'>
                <label htmlFor='email'>Votre adresse email:</label>
                    <input 
                    {...register('email')}
                    type='text' className='formControle' id='email' name='email'/>
                </div>
                <div className='request'>
                <label htmlFor='request'>Votre question:</label>
                    <textarea
                    {...register('request')}
                    className='formControle' id='request' name='request'/>
                </div>
                    <div className='button-form'><button>Envoyer</button></div>

            </div>
        </form>
    )
}

export default ContactForm
