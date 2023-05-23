import capacitiesList from '../../../datas/capacities.json';
import Capacity from './Capacity';
import { PresentationSection } from '../../../datas/presentation';

interface CapacitiesProps {
    presentationData: PresentationSection;
}

function Capacities(props: CapacitiesProps) {

    return(
        <div className="skills">
            <h3>{ props.presentationData.developer }</h3>
            <div className="capacities">
                {capacitiesList.map((data, index) => (
                    <Capacity key={`${ index }-${ data.name }`} name={ data.name } image={ data.urlImage } value= { data.value } id={ data.id }/>
                    )
                )}   
            </div>
        </div>
    )
}

export default Capacities;
