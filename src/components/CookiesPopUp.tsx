import { useContext, useState } from "react";
import { CookiesContext } from "./utils/context/CookiesProvider";
import { LangContext } from "./utils/context/LangProvider";

type Texts = {
    fr: Content;
    en: Content;
    pt: Content;
}

type Content = {
    title: string,
    firstSentence: string,
    pointOne: string,
    pointTwo: string,
    secondSentence: string,
    thirdSentence: string,
    accept: string,
    deny: string
}

function CookiesPopUp() {

    const texts: Texts = {
        fr: {
            title: "Avant d'accéder au site",
            firstSentence: "Nous utilisons des cookies pour :",
            pointOne: "Gérer le système de session du site.",
            pointTwo: "Mémoriser votre choix quant à l'utilisation des cookies ou de la langue.",
            secondSentence: "En acceptant, nous utiliseront donc des cookies à ces fins.",
            thirdSentence: "Si vous refusez, le site risque de devenir non fonctionnel, vous pourrez tout de même consulter les informations disponibles.",
            accept: "Tout accepter",
            deny: "Tout refuser"
        },
        en: {
            title: "Before you entry on this site",
            firstSentence: "We use cookies to :",
            pointOne: "Make our session system work.",
            pointTwo: "Memorize your cookies and languages choices.",
            secondSentence: "If you agree we will use cookies to do so.",
            thirdSentence: "If you deny the site site will not work properly. But you can still navigate on it.",
            accept: "Accept all",
            deny: "Deny all"
        },
        pt:{
            title: "Antes de acessar o site",
            firstSentence: "Utilizamos cookies para :",
            pointOne: "Gerenciar o sistema de sessão do site.",
            pointTwo: "Memorizar sua escolha quanto ao uso de cookies ou idioma.",
            secondSentence: "Ao aceitar, utilizaremos cookies para esses fins.",
            thirdSentence: "Se recusar, o site poderá deixar de funcionar, mas poderá continuar a consultar as informações disponíveis.",
            accept: "Aceitar tudo",
            deny: "Recusar tudo"
        }
    }

    const cookiesIsSet = () => { return cookiesContext?.cookies ? cookiesContext?.cookies : false }
    const langContext = useContext(LangContext);

    // On met en place le contexte pour afficher ou non la fenêtre et modifier son état.
    const cookiesContext = useContext(CookiesContext);

    // On crée un useState pour fermer la fenêtre sans accepter la politique des cookies.
    const [ closed, setClosed ] = useState(cookiesIsSet);

    // Fonction pour accepter 
    const handleClickAccept = () => {
        cookiesContext?.setCookies(true);
        localStorage.setItem('COOKIES', "true");
        setClosed(true);
    }

    // Fonction pour refuser
    const handleClickRefuse = () => {
        setClosed(true);
    }

    // Fonction pour ouvrir le panneau des cookies
    const handleOpenCookiesOption = () => {
        setClosed(false);
    }


    // Fonctions pour changer la langue
    const handleFrench = () =>{
        langContext?.setLang("FR");
    }

    const handleEnglish = () =>{
        langContext?.setLang("EN");
    }

    const handlePortuguese = () =>{
        langContext?.setLang("PT");
    }

    // Fonction pour ditribuer le texte en fonction de la langue sélectionnée
    const textInLang = () => {
        if(langContext?.lang === "EN"){
            return texts.en;
        } else if(langContext?.lang === "PT"){
            return texts.pt;
        } else {
            return texts.fr;
        }
    }

    if(!closed) {
        return(
            <div className="cookies">
                <div className="cookies__panel">
                    <div className="lang-choice">
                        <div onClick={handleFrench} className="lang">Français</div>
                        <div onClick={handleEnglish} className="lang">English</div>
                        <div onClick={handlePortuguese} className="lang">Português</div>
                    </div>
                    <div>
                        <h2>{textInLang().title}</h2>{"\n\n"}
                        <p>
                            {textInLang().firstSentence} {"\n\n"}
                            <ul>
                                <li>{textInLang().pointOne}</li>
                                <li>{textInLang().pointTwo}</li>
                            </ul>
                            {"\n\n"}
                            {textInLang().secondSentence} {"\n\n"}

                            {textInLang().thirdSentence}{"\n\n"}
                        </p>
                    </div>
                    <div>
                        <button onClick={handleClickAccept} className="button-alert">{textInLang().accept}</button>
                        <button onClick={handleClickRefuse} className="button-alert">{textInLang().deny}</button>
                    </div>
                </div>
            </div>
        )
    }

    if(closed && (localStorage.getItem('COOKIES') === null)) {

        return (<div onClick={handleOpenCookiesOption} className="cookie-button-open">Options des cookies</div>)
    }

    return(<div></div>)

}

export default CookiesPopUp;