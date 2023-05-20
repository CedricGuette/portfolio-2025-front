import Navigation from '../layouts/Navigation';
import JrpBody from '../sheets/jrpg/JrpgBody';
import JrpgFooter from '../sheets/jrpg/JrpgFooter';
import JrpgHeader from '../sheets/jrpg/JrpgHeader';

function Jrpg() {
    
    return(
        <div className="jrpgstat">
            <Navigation section='jrpg'/>
            <video autoPlay muted loop id="backgroundVideo">
                <source src="./videos/bois.mp4" type="video/mp4" />
            </video>
            <JrpgHeader />
            <JrpBody />
            <JrpgFooter />
        </div>
    )
}

export default Jrpg;
