import { useContext, useEffect, useState } from "react";
import Footer from "../layouts/Footer";
import FreeSpace from "../layouts/FreeSpace";
import Header from "../layouts/Header";
import NotFound from "../pages/NotFound";
import { AlertBoxContext } from "../utils/context/AlertBoxContext";
import { useParams } from "react-router-dom";
import FirstLogin from "./FirstLogin";

function AdministratorGenerator(){

    const alertBox = useContext(AlertBoxContext);

    const [isGoodUsername, setIsGoodUsername] = useState(false);

    let params = useParams();

    useEffect(()=>{
        try {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/exists/${params.username}`,{
                method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                setIsGoodUsername(data.isAdminUsername);
            })
        } catch(error: any) {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        }

    },[alertBox, params.username])

    const setUsername = () => {
        if(params.username !== undefined){
            return params.username;
        }else{
            return "";
        }
    }

    if(isGoodUsername === true) {
        return(
            <div className="app-body">
                <Header />
                <main>
                    <article className='admin-generator'>
                        <FirstLogin username={setUsername()}/>
                    </article>
                    <FreeSpace />
                </main>
                <Footer />
            </div>
        )
    } else {
        return(
            <NotFound />
        )
    }
}


export default AdministratorGenerator;