import ProjectResume from './ProjectResume';
import miscLang from '../../../datas/misc.json'
import { PortfolioProject, PortfolioProjectInt} from '../../../datas/porfolio';
import { LangContext } from '../../utils/context/LangProvider';
import { useContext, useEffect, useState } from 'react';
import { WindowPositionProvider } from '../../utils/context/WindowPositionProvider';
import ImageHolder from './ImagesHolder';

const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;

interface TextCodeProps {
    titleh2?: string;
    titleh3?: string;
    text?: string;
    image?: Array<string>;
    imageText?: string;
    project?: PortfolioProject;
    projectint?: PortfolioProjectInt;
}

function TextWindow(props: TextCodeProps) {

    const languageContext = useContext(LangContext);


    const [codeState, setCodeState] = useState<number | null>(null)


    useEffect(() => {
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
    const projectInt = props.projectint ? props.projectint : {"name":"undifined", "image":["undefined"],"git":"undefined", "live":"undefined", "beforeLive": false};
    const images = props.image ? props.image : ['undefined'];
    
    if(codeState !== CLOSED) {
        return (
            <WindowPositionProvider>
                <div className={ codeState === CLOSING ? 'textBlock fade' : 'textBlock'}>
                    <h2 className='codeTitle'>{props.project ? (props.project?.title) : props.titleh2}<div onClick={closeWindow} className='closeButton'>x</div></h2>
                    {props.image ? <ImageHolder image={images} imageText={props.imageText ? props.imageText : ''} projectint={projectInt} misc={misc()} /> : null}
                    {props.project !== undefined ? <ProjectResume project={props.project} projectint={props.projectint}/> : (<div className='textCode'>
                        <h3>{props.titleh3}</h3>
                        <p>{props.text}</p>
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
