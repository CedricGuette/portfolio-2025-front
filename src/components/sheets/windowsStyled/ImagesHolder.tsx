import { PortfolioProjectInt } from "../../../datas/porfolio";
import ImageWindow from './ImageWindow';
import { MiscPortfolio } from '../../../datas/misc';
import { useContext, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { WindowPosition, defineDefaultValueBoolean } from '../../utils/context/WindowPositionProvider';

const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;

interface ImageHolderProps {
    image: string[];
    imageText: string;
    projectint?: PortfolioProjectInt;
    misc: MiscPortfolio;
}

function ImageHolder(props: ImageHolderProps) {

    const windowPositionContext = useContext(WindowPosition);

    const windowOpen = useCallback( () => {
         return windowPositionContext?.windowsState ? windowPositionContext?.windowsState[1] : defineDefaultValueBoolean()
    },[windowPositionContext] );
    
    const [anyWindow, setAnyWindow] = useState<number | null>(null);

    useLayoutEffect(() => {
        if(windowPositionContext?.windowsState === null) {
            const howManyImages = () => {
                let imagesInitial: [number[], boolean[]] = [[0,0,0],[false, false, false]];
                for(let i = 0 ; i < props.image.length ; i++) {
                    imagesInitial[0].unshift(3 - i);
                    imagesInitial[0].pop();
                    imagesInitial[1].unshift(true);
                    imagesInitial[1].pop();
                }
                return imagesInitial
            }
            setAnyWindow(OPEN);
            windowPositionContext.setWindowsState(howManyImages());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {

        if(((windowOpen()[0] === false && windowOpen()[1] === false) && windowOpen()[2] === false) && anyWindow === OPEN) {

            setAnyWindow(CLOSING);
        }

    },[windowOpen, anyWindow])

    useEffect(() => {

        if(anyWindow === CLOSING) {

            const timer = setTimeout(() => {
                setAnyWindow(CLOSED);
            },1100);

            return () => clearTimeout(timer);

        }

    }, [setAnyWindow, anyWindow])

    // Building caption for images
    const imageCaption = () => {
        if(props.imageText){
            return props.imageText
        } else if(props.projectint){
            return props.misc.view + props.projectint?.name
        } else {
            return ''
        }
    }

    if(anyWindow !== CLOSED) {
        return(
            <div className={anyWindow === CLOSING ? 'imageHolder fade' : 'imageHolder'}>{
            props.image.map(
                (image, index) => 
                    <ImageWindow key={`${index} - ${props.imageText} image`} image={image} position={index} text={`${imageCaption()} ${index + 1}`} />
            )
            }
            <div className='holder'></div></div>
        )
    } else {
        return null
    }

}

export default ImageHolder;
