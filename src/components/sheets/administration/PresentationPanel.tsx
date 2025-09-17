import { useContext, useState } from "react";
import { AdminPresentationContext } from "../../utils/context/AdminPresentationProvider";

function PresentationPanel({title, text, idText, idLanguage}: {title: string, text: string, idText: number, idLanguage: number}) {

    const adminPresentation = useContext(AdminPresentationContext);

    const [titleState, setTitleState] = useState(title);
    const [textState, setTextState] = useState(text);

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleState(event.target.value);
        if(idText === 1) {

            if(adminPresentation !== null) {
                let newPresentation = adminPresentation.adminPresentation;

                newPresentation[idLanguage-1].firstTitle = event.target.value;
                adminPresentation?.setAdminPresentation(newPresentation);
            }

        } else if(idText === 2) {

            if(adminPresentation !== null) {
                let newPresentation = adminPresentation.adminPresentation;

                newPresentation[idLanguage-1].secondTitle = event.target.value;
                adminPresentation?.setAdminPresentation(newPresentation);
            }

        } else if(idText === 3) {

              if(adminPresentation !== null) {
                let newPresentation = adminPresentation.adminPresentation;

                newPresentation[idLanguage-1].thirdTitle = event.target.value;
                adminPresentation?.setAdminPresentation(newPresentation);
            }
        }
    }

    const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextState(event.target.value);
                if(idText === 1) {

            if(adminPresentation !== null) {
                let newPresentation = adminPresentation.adminPresentation;

                newPresentation[idLanguage-1].firstText = event.target.value;
                adminPresentation?.setAdminPresentation(newPresentation);
            }

        } else if(idText === 2) {

            if(adminPresentation !== null) {
                let newPresentation = adminPresentation.adminPresentation;

                newPresentation[idLanguage-1].secondText = event.target.value;
                adminPresentation?.setAdminPresentation(newPresentation);
            }

        } else if(idText === 3) {

              if(adminPresentation !== null) {
                let newPresentation = adminPresentation.adminPresentation;

                newPresentation[idLanguage-1].thirdText = event.target.value;
                adminPresentation?.setAdminPresentation(newPresentation);
            }
        }
    }

    return (
        <div className="presentation-text">
            <input type="text" value={titleState} onChange={handleChangeTitle} className="presentation-title"/>
            <textarea className ="presentation-textarea" value={textState} onChange={handleChangeText} ></textarea>
        </div>
    )
}

export default PresentationPanel;