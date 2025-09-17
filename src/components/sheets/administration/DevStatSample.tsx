import { useContext } from "react";
import { DevStatType } from "../../../datas/devstat";
import { DevStatContext } from "../../utils/context/DevStatProvider";

function DevStatSample({prop, index, empty}: {prop : DevStatType, index: number, empty: DevStatType}) {

    // On importe le contexte pour gérer les éléments
    const devStatContext = useContext(DevStatContext);

    // On crée une fonction pour sélectioner les éléments
    const handleSelected = () => {
        if(devStatContext?.devStat.id === prop.id){
            devStatContext?.setFocused(empty.id);
            devStatContext?.setDevStat(empty);
        }else{
            devStatContext?.setFocused(prop.id);
            devStatContext?.setDevStat(prop);
        }
    }

    
    return(
        <div className={` devStat ${ devStatContext?.focused === prop.id ? (prop.id === 0 ? "newSelected" : "selected") : ""}`} onClick={handleSelected}> 
        <div className="index-image">
            {prop.id === 0 ? "new" :`${prop.devstatIndex +1} - `}
            <img src={`${prop.id === 0 ? "" : process.env.REACT_APP_BACKEND_URL}${prop.id === 0 ? "./images/jrpg/capacities/no-image.png" : prop.abilityLogo}`} alt={`Logo de la stat ${prop.abilityName}`}/>
        </div>
        <div>
        { prop.abilityName }
        </div>
        { prop.abilityScore }/25 
        </div>
    )
}

export default DevStatSample;