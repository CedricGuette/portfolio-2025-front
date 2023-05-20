import miscLang from '../../../datas/misc.json';
import { LangContext } from '../../utils/context/LangProvider';
import { useContext } from 'react';
import { PortfolioProject, PortfolioProjectInt } from '../../../datas/porfolio';
import Button from '../Button';
import ScrollingLetters from '../scroll/ScrollingLetters';
import SplitLineScroll from '../scroll/SplitLineScroll';


interface ProjectResumeProp {
    project: PortfolioProject | undefined;
    projectint?: PortfolioProjectInt;
}

function ProjectResume(props: ProjectResumeProp) {

    const languageContext = useContext(LangContext);

    // Retrieving localised misc texts
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
        <div className='textCode'>
            <h3>{<ScrollingLetters textToScroll = {misc().resume} />}</h3>
            <p>{<SplitLineScroll textToSplit = {(props.project === undefined ? '' : props.project.resume)}/>}</p>
            <h3>{<ScrollingLetters textToScroll = {misc().technology} />}</h3>
            <p>{<SplitLineScroll textToSplit = {props.project === undefined ? '' : props.project.technology} /> }</p>
            {props.projectint?.git !== '' || props.projectint.live !== '' ? (
                <div className='buttonContainer'>
                    {props.projectint?.git ? (
                        <Button type={1} link={props.projectint.git} text={misc().github}/>
                    ) : (<Button type={0} link='' text={misc().unavailable}/>)}
                    {props.projectint?.live ? ( props.projectint.beforeLive === true ? (
                        <Button type={3} link={props.projectint.live} text={misc().preview}/>
                    ): (
                        <Button type={2} link={props.projectint.live} text={misc().preview}/>
                    )) : (<Button type={0} link='' text={misc().unavailable}/>)}
                </div>
            ) : null}<div className='freeSpaceInBlock'></div>
        </div>
    )
}

export default ProjectResume;
