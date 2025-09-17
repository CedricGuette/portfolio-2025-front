import { useContext } from "react";
import { AlertBoxContext } from "./utils/context/AlertBoxContext";

function AlertBox() {

    const alertBox = useContext(AlertBoxContext);

    const handleCloseAlertBox = () => {
        alertBox?.setAlertBox(null);
        alertBox?.setAlertBoxType(null);
    }

    if((alertBox?.alertBox !== null) && (alertBox?.alertBoxType === "success")) {
        return (
            <div className="alert-box">
                <div className="alert-box-success">
                    <div className="alert-box-title">Succès :</div>
                    <div className="alert-box-message">{alertBox?.alertBox}</div>
                    <div className="alert-box-buttons">
                        <button className="button-alert" onClick={handleCloseAlertBox}>Ok</button>
                    </div>
                </div>
            </div>
        )
    } else if((alertBox?.alertBox !== null) && (alertBox?.alertBoxType === "error")) {
        return (
            <div className="alert-box">
                <div className="alert-box-success">
                    <div className="alert-box-title">Erreur :</div>
                    <div className="alert-box-message">{alertBox?.alertBox}</div>
                    <div className="alert-box-buttons">
                        <button className="button-alert" onClick={handleCloseAlertBox}>Ok</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="empty-alert-box">
            </div>
        )
    }

}

export default AlertBox;