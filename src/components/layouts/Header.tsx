import logo from '../../assets/images/logo12.png'
import { Link } from 'react-router-dom'
import navJson from '../../datas/misc.json'
import LanguageSelector from './LanguageSelector'
import { useContext } from "react";
import { LangContext } from "../utils/context/LangProvider";


function Header() {

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
        <header>

            <div className="title-logo">
                <img src={logo} alt='Logo de Cédric Guetté'/>
            </div>
            <nav>
                <LanguageSelector />
                <ul>
                    <li>
                        <Link to='/'>{navBar().presentation}</Link>
                    </li>
                    <li className='link reversed'>
                        <Link to='/'>{navBar().experience}</Link>
                    </li>
                    <li>
                        <Link to='/portfolio'>{navBar().portfolio}</Link>
                    </li>
                    <li className='link reversed'>
                        <Link to='/'>{navBar().contact}</Link>
                    </li>
                    <li>
                        <a href='./booki/'>Booki</a>
                    </li>
                </ul>
            </nav>
            {/*<nav>
                <ul className='desktop'>
                    <li><Link to='/'>Accueil</Link></li>
                    <li><Link to='/a-propos'>A Propos</Link></li>
                </ul>
            </nav> 
        <SlidingText reversed={true}/> */}
        </header>
    )
}

export default Header
