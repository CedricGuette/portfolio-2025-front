import weaponsList from '../../../datas/weapons.json';
import Weapon from './Weapon';

function Weapons() {

    const weaponsPossesed = () => {
        return weaponsList.fr.possesed
    }

    const weaponsQuest = () => {
        return weaponsList.fr.quest
    }

    return(
        <div className="equipment">
            <h3>Armes</h3> 
            <div className="weapons">
                {weaponsPossesed().map((data, index) => (
                    <Weapon key={`${ index } - weapon`} text={ data.text } image={ data.imageUrl } />
                    )
                )}  
            </div>
            <h3>Récompense de la quête en cours</h3>
            <div className="weapons">
                {weaponsQuest().map((data, index) => (
                    <Weapon key={`${ index } - weapon`} text={ data.text } image={ data.imageUrl } />
                    )
                )}  
            </div>
        </div>
    )
}

export default Weapons
