import { useContext, useState } from "react";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import { AdminLoggedContext } from "../../utils/context/AdminLoggedProvider";
import { CookiesContext } from "../../utils/context/CookiesProvider";

function Login() {

    const alertBox = useContext(AlertBoxContext);
    const adminLogged = useContext(AdminLoggedContext);
    const cookiesContext = useContext(CookiesContext);

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setForm((prev)=>{
            return{
                ...prev,
                [event.target.name]: [event.target.value]
            }
        })
    }

    const body = {
        username:  `${form.username}`,
        password: `${form.password}`
    }

    const onSubmit = () => {
        let requestIsOk = false;
        try{
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,{
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(body)
            })
            .then((response) => {
                requestIsOk = response.ok;
                return response.json();
            })
            .then((data) => {
                if(requestIsOk){
                    const object = { value : data.token }
                    if(cookiesContext?.cookies){
                        localStorage.setItem("SESSION", JSON.stringify(object));
                    }
                    adminLogged?.setIsLogged(true);
                    alertBox?.setAlertBoxType("success");
                    alertBox?.setAlertBox("Vous êtes maintenant connecté.");
                }else{
                    alertBox?.setAlertBoxType("error");
                    alertBox?.setAlertBox(data.error);
                }
            })
        } catch(error: any){
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        }
    }
    return (
        <form className="login-form">
            <label>Identifiant :
                <input type="text" id="username" name="username" onChange={handleChange} />
            </label>
            <label>Mot de passe :
                <input type="password" id="password" name="password" onChange={handleChange} />
            </label>
            <button  onClick={onSubmit} type="button">Se connecter</button>
        </form>
    )
}

export default Login;