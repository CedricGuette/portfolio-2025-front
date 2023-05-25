import Header from '../layouts/Header';
import Logo from '../layouts/Logo';
import PresentationText from './PresentationText';
import ContactForm from './ContactForm';
import Jrpg from './Jrpg';
import PrePortfolio from './PrePortfolio';
import PresentationFooter from './PresentationFooter';


function Presentation() {

	return (
        <article className='scroller'>
            <section className='one' id='whoIAm'>
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
            <section className='five'>
                <Logo />
                <PresentationFooter />
            </section>
        </article>
    )
}

export default Presentation;
