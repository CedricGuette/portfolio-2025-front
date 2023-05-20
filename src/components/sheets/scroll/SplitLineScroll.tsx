import ScrollingLetters from './ScrollingLetters';

interface SplitLineSplitProps {
    textToSplit: string;
}

function SplitLineScroll(props: SplitLineSplitProps ) {

    const arraySplited = props.textToSplit.split('\n');

    return(
        <span>{
                arraySplited.map(
                    (line: string, index) => (
                        <ScrollingLetters key ={`${line.split('')} - ${index}`} textToScroll = {line} />
                        )
                    )   
            }</span>
    )
}

export default SplitLineScroll;
