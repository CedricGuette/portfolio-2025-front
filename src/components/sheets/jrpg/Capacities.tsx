import capacitiesList from '../../../datas/capacities.json';
import Capacity from './Capacity';

function Capacities() {

    return(
        <div className="skills">
            <h3>Développeur fullstack</h3>
            <div className="capacities">
                {capacitiesList.map((data, index) => (
                    <Capacity key={`${ index }-${ data.name }`} name={ data.name } image={ data.urlImage } value= { data.value }/>
                    )
                )}   
            </div>
        </div>
    )
}

export default Capacities
