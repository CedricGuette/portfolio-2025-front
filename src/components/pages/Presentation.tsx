import Header from '../layouts/Header';
import PresentationText from '../sheets/PresentationText';
import ContactForm from './ContactForm';
import Jrpg from './Jrpg';
import PrePortfolio from './PrePortfolio';


function Presentation() {
	return (
        <article className='scroller'>
            <section className='one'>
                <Header />
                <PresentationText />
            </section>
            <section className='two' id='qualif'>
                <Jrpg />
            </section>
            <section className='three' id='portfolio'>
                <PrePortfolio />
            </section>
            <section className='four' id='contact'>
                <ContactForm />
            </section>

        </article>
    )
}

export default Presentation
