import { PresentationSection } from '../../../datas/presentation';

interface ArtefactsProps {
    presentationData: PresentationSection;
}


function Artefacts(props: ArtefactsProps) {

    return(
        <div className="faces">
            <h3>{ props.presentationData.artefact } :</h3>
            <div className="face">
                <img src="./images/jrpg/misc/photo.png" alt="Fujifilm XT-3" />
            </div>
            <div className="face">
                <img src="./images/jrpg/misc/ps.png" alt="Adobe Photoshop" />
            </div>
            <div className="face">
                <img src="./images/jrpg/misc/pr.png" alt="Adobe Premiere Pro" />
            </div>
        </div>
    )
}

export default Artefacts;
