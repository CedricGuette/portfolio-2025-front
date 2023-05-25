import presentationData from '../../datas/presentation.json';
import { LangContext } from '../utils/context/LangProvider';
import { useContext } from 'react';
import TriplePhoto from '../sheets/introduction/TriplePhoto';
import ScrollingLetters from '../sheets/scroll/ScrollingLetters';
import SplitLineScroll from '../sheets/scroll/SplitLineScroll';



function PresentationText() {
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

	return (
        <div className="introduction">
            <TriplePhoto />
            <div className="introductionText">
                <h1>{ <ScrollingLetters  textToScroll={ presentation().title1 } /> }</h1>
                <p className="firstText">
                    { presentation().content1 }
                </p>
                <div className="secondText">
                    <h2>{ <ScrollingLetters  textToScroll={ presentation().title2 } /> }</h2>
                    <p>
                        { presentation().content2 }
                    </p>
                </div>
                <div className="thirdText">
                    <h2>{ <SplitLineScroll  textToSplit={ presentation().title3 } /> }{ <ScrollingLetters  textToScroll="" /> }</h2>
                    <p className="thirdText">
                        { presentation().content3 }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PresentationText;
