import { useState, useEffect, useContext, useCallback } from 'react';
import { WindowPosition, defineDefaultValueBoolean, defineDefaultValueNumber } from '../../utils/context/WindowPositionProvider';


interface ImageSampleProps {
    image: string;
    text?: string | null;
    position?: number;
    }

function ImageWindow(props: ImageSampleProps) {

    // We use this function to send information from context to setState
    const positionNumberToString = (position:number) => {
        if(position === 1) {
            return ' first'
        } else if (position === 2) {
            return ' second'
        } else if (position === 3) {
            return ' third'
        } else {
            return ''
        }
    }

    const windowPositionContext = useContext(WindowPosition);

    const windowPositions = useCallback( () => {
        return windowPositionContext?.windowsState ? windowPositionContext?.windowsState[0] : defineDefaultValueNumber() 
    }, [windowPositionContext]);

    const windowOpen = useCallback( () => {
         return windowPositionContext?.windowsState ? windowPositionContext?.windowsState[1] : defineDefaultValueBoolean()
    },[windowPositionContext] );

    const positionArray = [' center', ' left', ' right'];

    const propPosition = props.position ? props.position : 0;
    const initialPosition = positionNumberToString(propPosition)

    const [positionState, setPositionState] = useState(initialPosition);

    //Will give a different className depending of the position of the window in context. Will not change anything if closing the window.
    useEffect(() => {
        const positionAfterClickToString = positionNumberToString(windowPositions()[propPosition]);

        if(windowPositions()[propPosition] !== 0) {
            setPositionState(positionAfterClickToString);
        }
    }
    ,[windowPositions, propPosition])

    useEffect(() => {
        if(windowPositions()[propPosition] === 0) {
            const timer = setTimeout(() => {

                let newValue: boolean[] = windowOpen();
                newValue[propPosition] = false;
                
                windowPositionContext?.setWindowsState(([windowPositions(), newValue]));
            }, 700)
    
            return () => {
                clearTimeout(timer);
            }
        }
    },[propPosition, windowOpen, windowPositions, windowPositionContext])

    let position: string;

    // We block to zero if window is closed else we block max position to three
    const addOnePosition = (position:number) => {
        if(position <= 0) {
            return 0
        } else if(position >= 3){
            return 3
        } else {
            return position + 1
        }
    }

    //We block te possibility to put back the window in DOM
    const addtoFirstPosition = (position:number) => {
        if(position <= 0) {
            return 0
        } else {
            return 1
        }
    }

    // If we click on a window we send back to context every other position to lower one position (+1)
    const pickWindow = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();

        if(props.position === 0 && windowPositions()[0] !== (0 | 1)) {

            windowPositionContext?.setWindowsState([[
                addtoFirstPosition(windowPositions()[0]),
                addOnePosition(windowPositions()[1]),
                addOnePosition(windowPositions()[2])
                ], windowOpen()]);

        } else if (props.position === 1 && windowPositions()[1] !== (0 | 1)) {

            windowPositionContext?.setWindowsState([[
                addOnePosition(windowPositions()[0]),
                addtoFirstPosition(windowPositions()[1]),
                addOnePosition(windowPositions()[2])
            ], windowOpen()]);

        }  else if (props.position === 2 && windowPositions()[2] !== (0 | 1)) {

            windowPositionContext?.setWindowsState([[
                addOnePosition(windowPositions()[0]),
                addOnePosition(windowPositions()[1]),
                addtoFirstPosition(windowPositions()[2])
            ], windowOpen()]);
            
        }
    }

    const closeWindow = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        let newPosition: number[] = windowPositions();
        setPositionState(`${ positionNumberToString(newPosition[propPosition]) + ' fade'}`);
        newPosition[propPosition] = 0;
        windowPositionContext?.setWindowsState([newPosition, windowOpen()]);

    }

    if(props.position === 1 || 2) {
        props.position ? position = positionArray[props.position] : position = 'center' ;
    } else {
        position = 'center';
    }

    if(windowOpen()[propPosition] !== false) {
        return (
            <div onClick={pickWindow} className={`imageSample ${ position } ${positionState}`}>        
                {props.text ? (<div className='imageText'>{props.text}<div onClick={closeWindow} className='closeButton'>x</div></div>) : null}
                <div className='imgContainer'><img src={props.image} alt='nada' /></div>
            </div>
        )
    } else {
        return null
    }
}

export default ImageWindow;
