import { useContext } from 'react';
import { LangContext } from '../utils/context/LangProvider';


function LanguageSelector() {

    const languageContext = useContext(LangContext);
    const changeLangFR = (event: React.MouseEvent<HTMLElement>) => {
        languageContext?.setLang('FR');
    }
    const changeLangEN = (event: React.MouseEvent<HTMLElement>) => {
        languageContext?.setLang('EN');
    }
    const changeLangPT = (event: React.MouseEvent<HTMLElement>) => {
        languageContext?.setLang('PT');
    }

	return (
        <ul className='lang'>
            <li onClick={changeLangFR} className={languageContext?.lang === 'FR' ? 'activated' : ''}>FR</li>
            <li onClick={changeLangEN} className={languageContext?.lang === 'EN' ? 'activated' : ''}>EN</li>
            <li onClick={changeLangPT} className={languageContext?.lang === 'PT' ? 'activated' : ''}>PT</li>
        </ul>
    )
}

export default LanguageSelector;
