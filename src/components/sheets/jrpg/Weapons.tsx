import { LangContext } from '../../utils/context/LangProvider';
import { useContext } from 'react';
import weaponsList from '../../../datas/weapons.json';
import Weapon from './Weapon';
import { PresentationSection } from '../../../datas/presentation';

interface WeaponsProps {
    presentationData: PresentationSection;
}

function Weapons(props: WeaponsProps) {

    const languageContext = useContext(LangContext);

    const weaponsPossesed = () => {
        if(languageContext?.lang === 'EN'){
            return weaponsList.en.possesed
        } else if(languageContext?.lang === 'PT'){
            return weaponsList.pt.possesed
        } else {
            return weaponsList.fr.possesed
        }
    }

    const weaponsQuest = () => {
        if(languageContext?.lang === 'EN'){
            return weaponsList.en.quest
        } else if(languageContext?.lang === 'PT'){
            return weaponsList.pt.quest
        } else {
            return weaponsList.fr.quest
        }
    }

    return(
        <div className="equipment">
            <h3 className='smallBack'>{ props.presentationData.weapon }</h3> 
            <div className="weapons">
                {weaponsPossesed().map((data, index) => (
                    <Weapon key={`${ index } - weapon`} text={ data.text } image={ data.imageUrl } idList={ data.idList } id={ parseInt(data.id) } />
                    )
                )}  
            </div>
            <h3>{ props.presentationData.quest }</h3>
            <div className="weapons">
                {weaponsQuest().map((data, index) => (
                    <Weapon key={`${ index } - weapon`} text={ data.text } image={ data.imageUrl } idList={ data.idList } id={ parseInt(data.id) } />
                    )
                )}  
            </div>
        </div>
    )
}

export default Weapons;
