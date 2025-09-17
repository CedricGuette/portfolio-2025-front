import TextWindow from './windowsStyled/TextWindow';
import { ProjectType } from '../../datas/Project';


function ProjectCard({props, index}: {props: ProjectType, index: number}) {

	return (
        <TextWindow props={props}/>
    )
}

export default ProjectCard;
