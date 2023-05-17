import { Link } from 'react-router-dom';
import navJson from '../../datas/misc.json'
import LanguageSelector from './LanguageSelector'
import { useContext } from "react";
import { LangContext } from "../utils/context/LangProvider";

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
            <span>Navigation :</span>
                <ul>
                    <li className='link'>
                        <Link to='/'>{navBar().presentation}</Link>
                    </li>
                    <li className='link reversed'>
                        <a href='./#qualif'>Qualifications</a>
                    </li>
                    <li className='link'>
                        <a href='./#portfolio'>Mes réalisations</a>
                    </li>
                    <li className='link reversed sousMenu'>
                        <Link to='/portfolio'>{navBar().portfolio}</Link>
                    </li>
                    <li className='link'>
                        <a href='./#contact'>{navBar().contact}</a>
                    </li>
                </ul>

                <span>Me suivre :</span>
                <ul>
                    <li className='link reversed'>
                        <a href='https://github.com/CedricGuette/'>GitHub</a>
                    </li>
                    <li className='link'>
                        <a href='https://www.linkedin.com/in/Cédric-guetté-a519b1102/'>LinkedIn</a>
                    </li>
                </ul>

                <span>Sélection de la langue :</span>
                <LanguageSelector />
            </div>
        </div>
    )
}

export default Menu
