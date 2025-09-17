import { useContext } from "react";
import { AdminLoggedContext } from "../../utils/context/AdminLoggedProvider";
import { Link } from "react-router-dom";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";

function Navigation() {

    const adminLogged = useContext(AdminLoggedContext);
    const alertBox = useContext(AlertBoxContext);

    const logout = () => {
        localStorage.removeItem("SESSION");
        adminLogged?.setIsLogged(false);
        alertBox?.setAlertBoxType("success");
        alertBox?.setAlertBox("Vous êtes maintenant déconnecté.")
    }

    return(
        <div className="admin-navigation">
        {adminLogged?.isLogged ? <div className="admin-navigation-button" onClick={logout}>Se déconnecter</div> : ""}
        {adminLogged?.isLogged ? "/" : ""}
        <Link className="admin-navigation-button" to="../">Retourner au site</Link>
        </div>
    )
}

export default Navigation;