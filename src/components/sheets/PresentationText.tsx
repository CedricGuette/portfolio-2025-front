import miscLang from '../../datas/misc.json'
import { LangContext } from '../utils/context/LangProvider';
import { useContext } from 'react';
import TriplePhoto from './introduction/TriplePhoto';
import ScrollingLetters from './scroll/ScrollingLetters';



function PresentationText() {
    const languageContext = useContext(LangContext);

    const misc = () => {
        if(languageContext?.lang === 'EN'){
            return miscLang.en.portfolio
        } else if(languageContext?.lang === 'PT'){
            return miscLang.pt.portfolio
        } else {
            return miscLang.fr.portfolio
        }
    }

	return (
        <div className="introduction">
            <TriplePhoto />
            <div className="introductionText">
                <h1>{ <ScrollingLetters  textToScroll='Développeur Fullstack Junior' /> }</h1>
                <p className="firstText">
                    Je m'appelle Cédric Guetté, 30 ans. Je suis passioné par le web depuis tout petit et j'ai appris au collège le HTML/CSS/PHP/SQL grace au site du zéro.
                    Pendant des années je me suis contenté de faire des petites pages webs par ci, par là. L'idée d'en faire mon métiers me trottait dans la tête depuis un bon moment.
                </p>
                <div className="secondText">
                    <h2>{ <ScrollingLetters  textToScroll='Titre Professionel En Poche' /> }</h2>
                    <p>
                        J'ai récemment décidé de prendre cette direction en suivant une formation avec OpenClassrooms et en obtenant un titre professionel de développeur intégrateur web.
                    </p>
                </div>
                <div className="thirdText">
                    <h2>{ <ScrollingLetters  textToScroll="L'aventure Ne Fait Que n Commencer" /> }{ <ScrollingLetters  textToScroll="" /> }</h2>
                    <p className="thirdText">
                        Je suis actuellement en train de m'inscrire à une formation de concepteur développeur web chez O'clock.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PresentationText;
