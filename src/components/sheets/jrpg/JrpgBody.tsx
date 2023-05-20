import FullCaracter from './FullCaracter';
import Stats from './Stats';
import Weapons from './Weapons';

function JrpBody() {

    return(
        <div className="body">
            <Stats />
            <Weapons />
            <FullCaracter />
        </div>
    )
}

export default JrpBody;
