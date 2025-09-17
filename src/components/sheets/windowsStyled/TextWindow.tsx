import ProjectResume from './ProjectResume';
import miscLang from '../../../datas/misc.json';
import { LangContext } from '../../utils/context/LangProvider';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { WindowPositionProvider } from '../../utils/context/WindowPositionProvider';
import ImageHolder from './ImagesHolder';
import { ProjectType } from '../../../datas/Project';

const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;

function TextWindow({props}: {props: ProjectType}) {

    const languageContext = useContext(LangContext);

    const portfolioTitle = () => {
        if(languageContext?.lang === 'EN') { 
            return props.projectNameEnglish
        } else if(languageContext?.lang === 'PT') { 
            return props.projectNamePortuguese
        } else {
            return props.projectNameFrench
        }
    }

    const portfolioDescription = () => {
        if(languageContext?.lang === 'EN') { 
            return props.projectDescriptionEnglish
        } else if(languageContext?.lang === 'PT') { 
            return props.projectDescriptionPortuguese
        } else {
            return props.projectDescriptionFrench
        }
    }

    const portfolioInt = () => {
        const int = {
            name: props.projectNameEnglish,
            image: images,
            git: props.projectGitHubLink,
            live: props.projectLiveLink,
            beforeLive: false
        }

        return int;
    }


    const [codeState, setCodeState] = useState<number | null>(null)


    useLayoutEffect(() => {
        if(codeState === null) {
            setCodeState(OPEN);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(codeState === CLOSING) {     
            const timer = setTimeout(() => {
                setCodeState(CLOSED);

            }, 700)

            return () => clearTimeout(timer)
        }
    },[codeState])

    //We take back language contexte for all misc components 
    const misc = () => {
        if(languageContext?.lang === 'EN'){
            return miscLang.en.portfolio
        } else if(languageContext?.lang === 'PT'){
            return miscLang.pt.portfolio
        } else {
            return miscLang.fr.portfolio
        }
    }
    
    const closeWindow = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setCodeState(CLOSING);

    }
    const images = props.imageOne === "" ?
        ['undefined'] : 
        (props.imageTwo === "" ?
            [props.imageOne] : 
            (props.imageThree === "" ?
                [props.imageOne, props.imageTwo] : [props.imageOne, props.imageTwo, props.imageThree]));
    
    if(codeState !== CLOSED) {
        return (
            <WindowPositionProvider>
                <div className={ codeState === CLOSING ? 'textBlock fade' : 'textBlock'}>
                    <h2 className='codeTitle'>{portfolioTitle()}<div onClick={closeWindow} className='closeButton'>x</div></h2>
                    {images ? <ImageHolder image={images} imageText={""//props.imageText ? props.imageText : ''
                    } projectint={portfolioInt()} misc={misc()} /> : null}
                    {portfolioDescription() !== undefined ? <ProjectResume props={props} /> : (<div className='textCode'>
                        <h3>{portfolioTitle()}</h3>
                        <p>{portfolioDescription()}</p>
                    </div>)}
                </div>
            </WindowPositionProvider>
        );
    } else {
        return (
            null
        )
    }

}

export default TextWindow;
