import Capacity from './Capacity';
import { PresentationSection } from '../../../datas/presentation';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AlertBoxContext } from '../../utils/context/AlertBoxContext';
import { DevStatType } from '../../../datas/devstat';

interface CapacitiesProps {
    presentationData: PresentationSection;
}

function Capacities(props: CapacitiesProps) {

    const alertBox = useContext(AlertBoxContext);

        const newDevStat =  {   
                "id":0,
                "abilityName": "",
                "abilityScore":0,
                "devstatIndex": 0,
                "abilityLogo":""
            }
    
        const [devStat, setDevStat] = useState<Array<DevStatType>>([
            newDevStat
        ])
    

        useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/devstat`,
                {
                method : "GET",
            }) 
            .then((response) => response.json())
            .then((data) => {
                setDevStat(data);
            })
            .catch((error) => {
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString());
            });
    
        }, [alertBox]);

        const handleZeroesInScore = (score: number) => {
            let scoreString = "";

            if(score <= 9){
                scoreString = "0" + score.toString();
            } else {
                scoreString = score.toString();
            }

            return scoreString;
        }

    return(
        <div className="skills">
            <h3>{ props.presentationData.developer }</h3>
            <div className="capacities">
                {devStat.map((devStat, index) => (
                    <Capacity key={`${ index }-${ devStat.abilityName }`} name={ devStat.abilityName } image={ devStat.abilityLogo } value= { handleZeroesInScore(devStat.abilityScore) } id={ devStat.id.toString() }/>
                    )
                )}   
            </div>
        </div>
    )
}

export default Capacities;
