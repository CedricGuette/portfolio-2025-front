import Header from '../layouts/Header';
import PresentationText from '../sheets/PresentationText';
import Jrpg from './Jrpg';
import PrePortfolio from './PrePortfolio';


function Presentation() {
	return (
        <article className='scroller'>
            <section className='one'>
                <Header />
                <PresentationText />
            </section>
            <section className='two'>
                <Jrpg />
            </section>
            <section className='three'>
                <PrePortfolio />
            </section>
            <section className='four'>

            </section>

        </article>
    )
}

export default Presentation
