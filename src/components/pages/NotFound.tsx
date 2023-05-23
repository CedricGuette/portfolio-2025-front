import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import FreeSpace from '../layouts/FreeSpace';
import Footer from '../layouts/Footer';
import miscData from '../../datas/misc.json';
import { useContext } from 'react';
import { LangContext } from '../utils/context/LangProvider';

function LaPanthere() {

    const languageContext = useContext(LangContext); 

    const misc = () => {
        if(languageContext?.lang === 'EN'){
            return miscData.en
        } else if(languageContext?.lang === 'PT'){
            return miscData.pt
        } else {
            return miscData.fr
        }
    }

    return (
        <div className="app-body">
            <Header />
            <main className='notFound'>
                <h1>404</h1>
                <p> {misc().notfound.message} </p>
                <Link to='/'> {misc().notfound.home}</Link>
            </main>
            <FreeSpace />
            <Footer />
        </div>
    )
}

export default LaPanthere;
