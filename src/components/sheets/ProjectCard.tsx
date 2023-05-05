import { PortfolioLanguage } from "../../datas/porfolio";
import { LangContext } from "../utils/context/LangProvider";
import TextWindow from "./windowsStyled/TextWindow";
import { useContext } from 'react';

interface ProjectCardProps {
    project: PortfolioLanguage;
    index: number;
}

function ProjectCard(props: ProjectCardProps) {
    const languageContext = useContext(LangContext);

    const portfolio = () => {
        if(languageContext?.lang === 'EN') { 
            return props.project.en
        } else if(languageContext?.lang === 'PT') { 
            return props.project.pt
        } else {
            return props.project.fr
        }
    }

	return (
        <TextWindow project={portfolio()} image={props.project.int.image} projectint={props.project.int}/>
    )
}

export default ProjectCard;