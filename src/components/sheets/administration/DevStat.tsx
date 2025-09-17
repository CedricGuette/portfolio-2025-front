import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { DevStatType } from "../../../datas/devstat";
import { DevStatContext } from "../../utils/context/DevStatProvider";
import DevStatSample from "./DevStatSample";
import DevStatButtons from "./DevStatButtons";

function DevStat({props}: {props: Array<DevStatType>}) {

    // Context qui va gérer l'élément sélectionné
    const devStatContext = useContext(DevStatContext);

    // On crée une useState pour forcer le rendu
    const [forceRender, setForceRender] = useState(false);

    // Objet vide de DevStat
    const emptyDevStat =  {   
            "id":0,
            "abilityName": "",
            "abilityScore":0,
            "devstatIndex":0,
            "abilityLogo":""
        }

    // On récupère les données pour les traiter
    useEffect(() => {
        devStatContext?.setDevStats(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
    
    const [image, setImage] = useState<File | null>(null);

    // UseState et fonction pour réinitialiser l'input d'upload de fichier quand on change de sélection
    const [keyInput, setKeyInput] = useState("");

    // On crée une fonction qui génère une key aléatoire pour réinitialiser le input pour upload une image
    const emptyImage = () => {
        let randomString = Math.random().toString(36);
        setKeyInput(randomString);
        setImage(null);
    }

    // Fonctions qui vont gérer les entrées avec le contexte
    const handleChangeScoreValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(devStatContext !== null) {
            let newDevStat = devStatContext.devStat;
            newDevStat.abilityScore = parseInt(event.target.value);
            devStatContext.setDevStat(newDevStat);
            setForceRender(!forceRender);
        } 
    }

    const handleChangeStatName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(devStatContext !== null) {
            let newDevStat = devStatContext.devStat;
            newDevStat.abilityName = event.target.value;
            devStatContext.setDevStat(newDevStat);
            setForceRender(!forceRender);
        } 
    }

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            setImage(event.target.files[0]);
        }
    }

    // Fonction qui va permettre de maintenir le rendu quand on crée un nouvel élément dans la liste
    const maintainRender = () => {
        if(devStatContext?.isCreating && devStatContext !== null && devStatContext.devStats[devStatContext.devStats.length -1].id !== 0){
            let renderMaintained = devStatContext.devStats;
            renderMaintained.push(devStatContext.devStat);
            return renderMaintained;
        } else {
            if(devStatContext !== null){
                return devStatContext?.devStats;
            } else {
                return [emptyDevStat];
            }
        }
    }
    
    return (
        <div className="admin-sub-panel">
            <h3>Stats de dev:</h3>
            <div className="devStat-list">
                {maintainRender().map((data, index) => (
                    <div onClick={()=> emptyImage()} key={"div" + index}>
                        <DevStatSample key={index} prop={data} index={index} empty={emptyDevStat} />
                    </div>
                    )
                )} 
            </div>
            <div className="option-field">
                <input type="text" onChange={handleChangeStatName} className="textfield" value={devStatContext?.devStat.abilityName}/>
                <select className="numberfield" onChange={handleChangeScoreValue} value={devStatContext?.devStat.abilityScore}>
                    <option value="0">00</option>
                    <option value="5">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
                {devStatContext?.devStat.id !== 0 ? <img src={`${process.env.REACT_APP_BACKEND_URL}${devStatContext ? devStatContext?.devStat.abilityLogo : ""}`} alt={`logo de la stat ${devStatContext?.devStat.abilityName}`}/> : ""}
                <input type="file" className="filefield" onChange={handleChangeImage} key={keyInput}/> 
            </div>
            <DevStatButtons emptyDevStat={emptyDevStat} image={image} />
        </div>
    )
}

export default DevStat;