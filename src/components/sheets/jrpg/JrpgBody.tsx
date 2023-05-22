import FullCaracter from './FullCaracter';
import Stats from './Stats';
import Weapons from './Weapons';
import { PresentationSection } from '../../../datas/presentation';

interface JrpgBodyProps {
    presentationData: PresentationSection;
}

function JrpBody(props: JrpgBodyProps) {

    return(
        <div className="body">
            <Stats presentationData={ props.presentationData }/>
            <Weapons presentationData={ props.presentationData }/>
            <FullCaracter />
        </div>
    )
}

export default JrpBody;
