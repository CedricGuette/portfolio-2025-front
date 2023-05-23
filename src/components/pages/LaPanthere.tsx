import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import FreeSpace from '../layouts/FreeSpace';
import Footer from '../layouts/Footer';
import lapanthereData from '../../datas/lapanthere.json';
import { useContext } from 'react';
import { LangContext } from '../utils/context/LangProvider';

function LaPanthere() {

    const languageContext = useContext(LangContext); 

    const lapanthere = () => {
        if(languageContext?.lang === 'EN'){
            return lapanthereData.en
        } else if(languageContext?.lang === 'PT'){
            return lapanthereData.pt
        } else {
            return lapanthereData.fr
        }
    }

    return (
        <div className="app-body">
            <Header />
            <main>
                <Link to='../portfolio'>{ lapanthere().back }</Link>
                <h1>{ lapanthere().title }</h1>
                <p>{ lapanthere().posttitle }</p>
                <article className="avant">
                    <h2>{ lapanthere().subtitle1 }</h2>
                    <a href='https://lapanthere-apres.cedric-guette.com'>{ lapanthere().link1 }</a>
                </article>
                <article className="apres">
                    <h2>{ lapanthere().subtitle2 }</h2>
                    <a href='https://lapanthere-avant.cedric-guette.com'>{ lapanthere().link2 }</a>
                </article>
                <article className="rapport">
                    <h2>{ lapanthere().subtitle3 }</h2>
                <a href='../../pdf/rapport.pdf'>{ lapanthere().link3 }</a>
                </article>
            </main>
            <FreeSpace />
            <Footer />
        </div>
    )
}

export default LaPanthere;
