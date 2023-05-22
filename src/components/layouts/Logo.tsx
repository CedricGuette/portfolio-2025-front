import { LangContext } from '../utils/context/LangProvider';
import { useContext } from 'react';

import flower from '../../assets/images/flowerlogo.png';

function Logo() {
    const languageContext = useContext(LangContext);

    const developer = () => {
        if(languageContext?.lang === 'EN'){
            return 'Fullstack Developer'
        } else if(languageContext?.lang === 'PT'){
            return 'Desevelvedor Fullstack'
        } else {
            return 'Développeur Fullstack'
        }
    }

	return (
            <div className='logo'>
                <div className="image"><img src={ flower } alt="flower" /></div>
                <div className="text">
                    <span className="name">Cédric Guetté</span>
                    <span className="function">{ developer() }</span>
                </div>
            </div>
    )
}

export default Logo;
