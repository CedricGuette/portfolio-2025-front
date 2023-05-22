import LanguageSelector from '../layouts/LanguageSelector';
import { HashLink as Link } from 'react-router-hash-link';
import navJson from '../../datas/misc.json';
import { useContext } from 'react';
import { LangContext } from '../utils/context/LangProvider';

function PresentationFooter() {
    const languageContext = useContext(LangContext); 

    const misc = () => {
        if(languageContext?.lang === 'EN'){
            return navJson.en
        } else if(languageContext?.lang === 'PT'){
            return navJson.pt
        } else {
            return navJson.fr
        }
    }

	return (
        <div className='presentationFooter'>
            <div className="menu">
                <div className="menuSection">
                <span>{misc().nav.navigation} :</span>
                    <ul>
                        <li className='link'>
                            <Link to='/#whoIAm'>{misc().nav.presentation}</Link>
                        </li>
                        <li className='link reversed'>
                            <Link to='/#qualif'>{misc().nav.experience}</Link>
                        </li>
                        <li className='link'>
                            <Link to='/#portfolio'>{misc().nav.realisation}</Link>
                        </li>
                        <li className='link reversed sousMenu'>
                            <Link to='/portfolio'>{misc().nav.portfolio}</Link>
                        </li>
                        <li className='link'>
                            <Link to='/#contact'>{misc().nav.contact}</Link>
                        </li>
                    </ul>
                </div>
                <div className="menuSection">
                    <span>{misc().nav.follow} :</span>
                    <ul>
                        <li className='link reversed'>
                            <a href='https://github.com/CedricGuette/'>GitHub</a>
                        </li>
                        <li className='link'>
                            <a href='https://www.linkedin.com/in/Cédric-guetté-a519b1102/'>LinkedIn</a>
                        </li>
                    </ul>
                </div>
                <div className="menuSection">
                    <span>{misc().nav.language} :</span>
                    <LanguageSelector />
                </div>
                <div className="copyright">
                    <span>{ misc().footer.copyright } 2023 Cédric Guetté</span>
                </div>
            </div>
        </div>
    )
}

export default PresentationFooter;
