import { HashLink as Link } from 'react-router-hash-link';
import navJson from '../../datas/misc.json';
import LanguageSelector from './LanguageSelector';
import { useContext } from 'react';
import { LangContext } from '../utils/context/LangProvider';


function Menu() {

    const languageContext = useContext(LangContext); 

    const navBar = () => {
        if(languageContext?.lang === 'EN'){
            return navJson.en.nav
        } else if(languageContext?.lang === 'PT'){
            return navJson.pt.nav
        } else {
            return navJson.fr.nav
        }
    }
    return (
        <div className="menu">
            <div className="menu__ref">
            <span>{navBar().navigation} :</span>
                <ul>
                    <li className='link'>
                        <Link to='/#whoIAm'>{navBar().presentation}</Link>
                    </li>
                    <li className='link reversed'>
                        <Link to='/#qualif'>{navBar().experience}</Link>
                    </li>
                    <li className='link'>
                        <Link to='/#portfolio'>{navBar().realisation}</Link>
                    </li>
                    <li className='link reversed sousMenu'>
                        <Link to='/portfolio'>{navBar().portfolio}</Link>
                    </li>
                    <li className='link'>
                        <Link to='/#contact'>{navBar().contact}</Link>
                    </li>
                </ul>

                <span>{navBar().follow} :</span>
                <ul>
                    <li className='link reversed'>
                        <a href='https://github.com/CedricGuette/'>GitHub</a>
                    </li>
                    <li className='link'>
                        <a href='https://www.linkedin.com/in/Cédric-guetté-a519b1102/'>LinkedIn</a>
                    </li>
                </ul>

                <span>{navBar().language} :</span>
                <LanguageSelector />
            </div>
        </div>
    )
}

export default Menu;
