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
            <ul>
                <li>
                    <Link to='/'>{navBar().presentation}</Link>
                </li>
                <li className='link reversed'>
                    <Link to='/portfolio'>{navBar().portfolio}</Link>
                </li>
                <li className='link'>
                    <Link to='/'>{navBar().contact}</Link>
                </li>
            </ul>

            Sélection de la langue <br />
            <LanguageSelector />
        </div>
    )
}

export default Menu
