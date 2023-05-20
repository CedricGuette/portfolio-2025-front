import * as React from 'react';
import { LangContext } from "../../utils/context/LangProvider";

interface ScrollingLettersProps {
    textToScroll: string
}

function ScrollingLetters(props: ScrollingLettersProps) {

    const languageContext = React.useContext(LangContext);
    const howManyScrolls = 3;

    const timeBetweenTwoScrolls = 30;

    // Determining all possible caracters in effect

    const arrayOfSymbols = React.useMemo(() => {

        return [
            "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
            "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
            "'","(",")","&","?","!","/",";",".",",","ù","%","§","$","£","€","{","}","[","]","#","é","\"","|","-","_",
        ];
    },[])

    const minRandom = Math.ceil(0);
    const maxRandom = Math.floor(arrayOfSymbols.length);
    const getRandom = Math.floor(Math.random() * (maxRandom - minRandom) + minRandom);

    const [text, setText] = React.useState('');
    const [scroll, setScroll] = React.useState('');

    React.useEffect(() => {
        if(text === props.textToScroll) {
            setScroll('');    
            return
        }
            const timer = setTimeout(() => {
               setScroll(arrayOfSymbols[getRandom]);
            }, timeBetweenTwoScrolls / howManyScrolls)
            return () => clearTimeout(timer);
    },[setScroll, arrayOfSymbols, getRandom, text, props])

    React.useEffect(() => {
        if(text === props.textToScroll) return
        const timer = setTimeout(() => {
            setText(props.textToScroll.slice(0, text.length+1));
        }, timeBetweenTwoScrolls * howManyScrolls)

        return () => clearTimeout(timer);
    }, [text, props])

    React.useEffect(() => {
        setText('');
    },[languageContext])


    return(
    <span>{ text }{ scroll }<br /></span>
    )
}

export default ScrollingLetters;
