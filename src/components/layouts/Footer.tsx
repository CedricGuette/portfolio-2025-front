import logo from '../../assets/images/flowerlogo.png';
import navJson from '../../datas/misc.json';
import { useContext } from 'react';
import { LangContext } from '../utils/context/LangProvider';

function Footer() {
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
    
    const year = () => {
        const date = new Date(Date.now());
        return date.getFullYear();
    }
    
	return (
        <footer>
            <div className='title-logo'>
                <img src={logo} alt='Logo de Cédric Guetté'/>
            </div>
            <div className="copyright">
                    <span>{ misc().footer.copyright } 2023-{year()} Cédric Guetté</span>
            </div>
        </footer>
    )
}

export default Footer;
