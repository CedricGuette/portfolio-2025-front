import presentationData from '../../datas/presentation.json';
import { LangContext } from '../utils/context/LangProvider';
import { useContext } from 'react';
import Navigation from '../layouts/Navigation';
import JrpBody from '../sheets/jrpg/JrpgBody';
import JrpgFooter from '../sheets/jrpg/JrpgFooter';
import JrpgHeader from '../sheets/jrpg/JrpgHeader';

function Jrpg() {
    const languageContext = useContext(LangContext);

    const presentation = () => {
        if(languageContext?.lang === 'EN'){
            return presentationData.en
        } else if(languageContext?.lang === 'PT'){
            return presentationData.pt
        } else {
            return presentationData.fr
        }
    }
    
    return(
        <div className="jrpgstat">
            <Navigation section='jrpg'/>
            <video autoPlay muted loop id="backgroundVideo">
                <source src="./videos/bois.mp4" type="video/mp4" />
            </video>
            <JrpgHeader presentationData={presentation()}/>
            <JrpBody presentationData={presentation()}/>
            <JrpgFooter presentationData={presentation()}/>
        </div>
    )
}

export default Jrpg;
