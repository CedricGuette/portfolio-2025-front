import { PresentationSection } from '../../../datas/presentation';

interface JrpgFooterProps {
    presentationData: PresentationSection;
}

function JrpgFooter(props: JrpgFooterProps) {

    return(
        <div className="footer">
            <div className="others">
                <h3>{ props.presentationData.languages }:</h3>
                <div className="other">
                    <img src="./images/jrpg/flags/fr.jpg" alt="Drapeau de la France" />
                    <img src="./images/jrpg/flags/br.jpg" alt="Drapeau du Brésil" />
                    <img src="./images/jrpg/flags/perfide.jpg" alt="Drapeau de l'Albion" />
                </div>
            </div>
        </div>
    )
}

export default JrpgFooter;
