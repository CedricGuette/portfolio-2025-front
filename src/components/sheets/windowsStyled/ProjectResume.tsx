import miscLang from '../../../datas/misc.json';
import { LangContext } from '../../utils/context/LangProvider';
import { useContext } from 'react';
import Button from '../Button';
import ScrollingLetters from '../scroll/ScrollingLetters';
import SplitLineScroll from '../scroll/SplitLineScroll';
import { ProjectType } from '../../../datas/Project';


function ProjectResume({props}: {props: ProjectType}) {

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

    const portfolioDescription = () => {
        if(languageContext?.lang === 'EN') { 
            return props.projectDescriptionEnglish
        } else if(languageContext?.lang === 'PT') { 
            return props.projectDescriptionPortuguese
        } else {
            return props.projectDescriptionFrench
        }
    }

	return (
        <div className='textCode'>
            <h3>{<ScrollingLetters textToScroll = {misc().resume} />}</h3>
            <p>{<SplitLineScroll textToSplit = {(props === undefined ? '' : portfolioDescription())}/>}</p>
            <h3>{<ScrollingLetters textToScroll = {misc().technology} />}</h3>
            <p>{<SplitLineScroll textToSplit = {props === undefined ? '' : props.projectTechnologies} /> }</p>
            {props.projectGitHubLink !== '' || props.projectLiveLink !== '' ? (
                <div className='buttonContainer'>
                    {props.projectGitHubLink ? (
                        <Button type={1} link={props.projectGitHubLink} text={misc().github}/>
                    ) : (<Button type={0} link='' text={misc().unavailable}/>)}
                    {props.projectLiveLink ? ( props.projectLiveLink ? (
                        <Button type={3} link={props.projectLiveLink} text={misc().preview}/>
                    ): (
                        <Button type={2} link={props.projectLiveLink} text={misc().preview}/>
                    )) : (<Button type={0} link='' text={misc().unavailable}/>)}
                </div>
            ) : null}<div className='freeSpaceInBlock'></div>
        </div>
    )
}

export default ProjectResume;
