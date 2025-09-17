import { LangContext } from '../utils/context/LangProvider';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TriplePhoto from '../sheets/introduction/TriplePhoto';
import ScrollingLetters from '../sheets/scroll/ScrollingLetters';
import SplitLineScroll from '../sheets/scroll/SplitLineScroll';
import { PresentationType } from '../../datas/presentation';



function PresentationText() {
    const languageContext = useContext(LangContext);

        const [presentationText, setPresentationText] = useState<Array<PresentationType>>([{
            "id": 0,
            "firstTitle": "",
            "firstText": "",
            "secondTitle": "",
            "secondText": "",
            "thirdTitle": "",
            "thirdText": ""
        },
        {
            "id": 1,
            "firstTitle": "",
            "firstText": "",
            "secondTitle": "",
            "secondText": "",
            "thirdTitle": "",
            "thirdText": ""
        },
        {
            "id": 2,
            "firstTitle": "",
            "firstText": "",
            "secondTitle": "",
            "secondText": "",
            "thirdTitle": "",
            "thirdText": ""
        }]);

            useEffect(() => {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/presentation`,
                    {
                    method : "GET",
                }) 
                .then((response) => response.json())
                .then((data) => {
                    setPresentationText(data);
                })
            }, []);

    const presentation = () => {
        if(languageContext?.lang === 'EN'){
            return presentationText[1];
        } else if(languageContext?.lang === 'PT'){
            return presentationText[2];
        } else {
            return presentationText[0];
        }
    }

	return (
        <div className="introduction">
            <TriplePhoto />
            <div className="introductionText">
                <h1>{ <ScrollingLetters  textToScroll={ presentation().firstTitle } /> }</h1>
                <p className="firstText">
                    { presentation().firstText }
                </p>
                <div className="secondText">
                    <h2>{ <ScrollingLetters  textToScroll={ presentation().secondTitle } /> }</h2>
                    <p>
                        { presentation().secondText }
                    </p>
                </div>
                <div className="thirdText">
                    <h2>{ <SplitLineScroll  textToSplit={ presentation().thirdTitle } /> }{ <ScrollingLetters  textToScroll="" /> }</h2>
                    <p className="thirdText">
                        { presentation().thirdText }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PresentationText;
