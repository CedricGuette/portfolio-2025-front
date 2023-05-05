import ImageHolder from "./windowsStyled/ImagesHolder";
import miscLang from '../../datas/misc.json'
import { LangContext } from '../utils/context/LangProvider';
import { WindowPositionProvider } from '../utils/context/WindowPositionProvider';
import { useContext } from 'react';



function PresentationText() {
    const languageContext = useContext(LangContext);
    const imageToInsert = ['./presentation/img_sample_1.jpg'];

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
        <div className='presentationText'>
            <WindowPositionProvider>
                <ImageHolder image={imageToInsert} imageText='Ma grosse tête' misc={misc()}/>
            </WindowPositionProvider>
            <p>COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU COUCOU</p>
        </div>
    )
}

export default PresentationText
