import Artefacts from './Artefacts';
import JrpgTitle from './JrpgTitle';
import { PresentationSection } from '../../../datas/presentation';

interface JrpgHeaderProps {
    presentationData: PresentationSection;
}

function JrpgHeader(props: JrpgHeaderProps) {

    return(
        <div className="header">
            <JrpgTitle presentationData={ props.presentationData }/>
            <Artefacts presentationData={ props.presentationData }/>
        </div>
    )
}

export default JrpgHeader;
