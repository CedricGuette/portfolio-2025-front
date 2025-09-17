import Presentation from "./Presentation";
import { AdminPresentationContextProvider } from "../../utils/context/AdminPresentationProvider";
import Profile from "./Profile";
import Project from "./Project";
import { AdminProjectContextProvider } from "../../utils/context/AdminProjectProvider";
import Contact from "./Contact";
import Login from "./Login";
import { useContext, useEffect } from "react";
import { AdminLoggedContext } from "../../utils/context/AdminLoggedProvider";
import Navigation from "./Navigation";
import ChangePassword from "./ChangePassword";

function AdminPanel() {

    // On importe le contexte pour savoir si l'admin est connecté
    const adminLogged = useContext(AdminLoggedContext);

    // On vérifie qu'un cookie est bien présent
    useEffect(() => {

        if(localStorage.getItem("SESSION") !== null){
            adminLogged?.setIsLogged(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // On affiche si l'admin est connecté
    if(adminLogged?.isLogged === true) {
        return (
        <div className="administration">
            <h1>Administration</h1>
            <Navigation />
            <Contact />
            <AdminPresentationContextProvider>
                    <Presentation />
            </AdminPresentationContextProvider>
            <Profile />
            <AdminProjectContextProvider>
                <Project />
            </AdminProjectContextProvider>
            <ChangePassword />
        </div>)
    } else {
                return (
        <div className="administration">
            <h1>Administration</h1>
                <Navigation />
                <Login />
        </div>)
    }

}

export default AdminPanel;