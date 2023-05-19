import Header from './layouts/Header';
import ContactForm from './pages/ContactForm';
import Jrpg from './pages/Jrpg';
import PrePortfolio from './pages/PrePortfolio';
import PresentationText from './sheets/PresentationText';

function Premiere() {

    return(
            <article className='scroller'>
                <section className='two'>
                    <Jrpg />
                </section>
            </article>
    )
}

export default Premiere