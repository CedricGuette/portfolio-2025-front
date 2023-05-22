import { PresentationSection } from '../../../datas/presentation';

interface JrpgTitleProps {
    presentationData: PresentationSection;
}

function JrpgTitle(props: JrpgTitleProps) {

    return(
        <div className="title">
            <h2>
                <img src="./images/jrpg/misc/armor.svg" alt="Armor" /> <span className="text">{ props.presentationData.stat }</span>
            </h2>
        </div>
    )
}

export default JrpgTitle;
