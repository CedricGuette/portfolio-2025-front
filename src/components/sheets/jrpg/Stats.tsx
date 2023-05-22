import Capacities from './Capacities';
import JrpgPlayerHead from './JrpgPlayerHead';
import { PresentationSection } from '../../../datas/presentation';

interface StatsProps {
    presentationData: PresentationSection;
}


function Stats(props: StatsProps) {

    return(
        <div className="stats">
            <JrpgPlayerHead />
            <Capacities presentationData={ props.presentationData }/>
        </div>
    )
}

export default Stats;
