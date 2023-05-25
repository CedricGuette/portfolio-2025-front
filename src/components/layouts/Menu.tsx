import { HashLink as Link } from 'react-router-hash-link';
import navJson from '../../datas/misc.json';
import LanguageSelector from './LanguageSelector';
import { useContext, useCallback } from 'react';
import { LangContext } from '../utils/context/LangProvider';
import { MenuIsOpen, defineDefaultMenuIsOpen } from '../utils/context/MenuProvider';


function Menu() {

    const languageContext = useContext(LangContext); 

    const menuContext = useContext(MenuIsOpen); 

    const windowOpen = useCallback( () => {
        return menuContext?.isOpen ? menuContext?.isOpen : defineDefaultMenuIsOpen()
   },[menuContext] );

    const closeNavigation = () => {

        menuContext?.setMenuOpen([!windowOpen()[0], true]);
    }

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
                        <Link to='/#whoIAm' onClick={ closeNavigation }>{navBar().presentation}</Link>
                    </li>
                    <li className='link reversed'>
                        <Link to='/#qualif' onClick={ closeNavigation }>{navBar().experience}</Link>
                    </li>
                    <li className='link'>
                        <Link to='/#portfolio' onClick={ closeNavigation }>{navBar().realisation}</Link>
                    </li>
                    <li className='link reversed sousMenu' onClick={ closeNavigation }>
                        <Link to='/portfolio'>{navBar().portfolio}</Link>
                    </li>
                    <li className='link' onClick={ closeNavigation }>
                        <Link to='/#contact'>{navBar().contact}</Link>
                    </li>
                </ul>

                <span>{navBar().follow} :</span>
                <ul>
                    <li className='link reversed' onClick={ closeNavigation }>
                        <a href='https://github.com/CedricGuette/'>GitHub</a>
                    </li>
                    <li className='link' onClick={ closeNavigation }>
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
