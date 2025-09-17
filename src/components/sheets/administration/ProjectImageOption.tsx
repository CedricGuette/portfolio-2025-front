import { useState } from "react";
import { useContext } from "react";
import { AdminProjectContext } from "../../utils/context/AdminProjectProvider";
import { ProjectType } from "../../../datas/Project";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";

function ProjecImageOption({prop, idPhoto}: {prop: ProjectType | undefined, idPhoto: number}) {

    const adminProjectContext = useContext(AdminProjectContext);
    const alertBox = useContext(AlertBoxContext);

    const [image, setImage] = useState<File | null>(null);

    // UseState et fonction pour réinitialiser l'input d'upload de fichier quand on change de sélection
    const [keyInput, setKeyInput] = useState("");

    const emptyImage = () => {
        let randomString = Math.random().toString(36);
        setKeyInput(randomString);
        setImage(null);
    }

    const body = JSON.stringify({
    })
     // On crée un objet Blob pour le fichier image
    const blob = new Blob([body], { type: "application/json" });
    const formData:any = new FormData();
    formData.append("project", blob);
    formData.append("image", image);

    const updateContextByPhotoId = (photoId: number, urlToUpdate: string) => {
        if(adminProjectContext !== null){
            let contextToUpdate = adminProjectContext.adminProject;
            if(photoId === 1){
                contextToUpdate.imageOne = urlToUpdate;
            } else if(photoId === 2) {
                contextToUpdate.imageTwo = urlToUpdate;
            } else {
                contextToUpdate.imageThree = urlToUpdate;
            }

            adminProjectContext.setAdminProject(contextToUpdate);
        }
    }

    //Fonction pour créer une photo
    const handleCreateImage = async () => {
        if(adminProjectContext !== null && adminProjectContext?.adminProject !== null && image !== null) { 

            let requestIsOk = false;

            try {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/project/image/${adminProjectContext?.adminProject.id}/create/${idPhoto}`,
                     {
                    method: "PUT",
                    headers : { 
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                    },
                    body: formData
                })
                .then((res) =>  {
                    if(res.ok === true) {
                        requestIsOk = true;
                    }
                    return res.json()
                })
                .then((data) => {
                    if(requestIsOk === true) {
                        alertBox?.setAlertBoxType("success");
                        alertBox?.setAlertBox(data.updated);
                        updateContextByPhotoId(idPhoto, data.url);
                        emptyImage();

                    } else {
                        alertBox?.setAlertBoxType("error");
                        alertBox?.setAlertBox(data.error);
                    }
                });
            } catch (error: any) {
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString());
            }
        } else {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez ajouter une photo avant de sélectioner une option.");
        }
    }

    //Fonction pour mettre à jour une photo
    const handleUpdateImage = async () => {
        if(adminProjectContext !== null && adminProjectContext?.adminProject !== null && image !== null) { 

            let requestIsOk = false;

            try {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/project/image/${adminProjectContext?.adminProject.id}/update/${idPhoto}`,
                     {
                    method: "PUT",
                    headers : { 
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                    },
                    body: formData
                })
                .then((res) =>  {
                    if(res.ok === true) {
                        requestIsOk = true;
                    }
                    return res.json()
                })
                .then((data) => {
                    if(requestIsOk === true) {
                        alertBox?.setAlertBoxType("success");
                        alertBox?.setAlertBox(data.updated);
                        updateContextByPhotoId(idPhoto, data.url);
                        emptyImage();
                    } else {
                        alertBox?.setAlertBoxType("error");
                        alertBox?.setAlertBox(data.error);
                    }
                });
            } catch (error: any) {
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString());
            }
        } else {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez ajouter une photo avant de sélectioner une option.");
        }
    }

    //Fonction pour supprimer une photo 
    const handleDeleteImage = async () => {
        if(adminProjectContext !== null && adminProjectContext?.adminProject !== null) { 

            let requestIsOk = false;

            try {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/project/image/${adminProjectContext?.adminProject.id}/delete/${idPhoto}`,
                     {
                    method: "PUT",
                    headers : { 
                        "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                    },
                    body: null
                })
                .then((res) =>  {
                    if(res.ok === true) {
                        requestIsOk = true;
                    }
                    return res.json()
                })
                .then((data) => {
                    if(requestIsOk === true) {
                        alertBox?.setAlertBoxType("success");
                        alertBox?.setAlertBox(data.updated);
                        updateContextByPhotoId(idPhoto, data.url);
                        emptyImage();
                    } else {
                        alertBox?.setAlertBoxType("error");
                        alertBox?.setAlertBox(data.error);
                    }
                });
            } catch (error: any) {
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString());
            }
        } else {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Veuillez ajouter une photo avant de sélectioner une option.");
        }
    }

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            setImage(event.target.files[0]);
        }
    }

    const imageSelector = () => {
        if(prop !== undefined){
            if(idPhoto === 1) {
                return prop.imageOne
            } else if(idPhoto === 2){
                return prop.imageTwo
            } else {
                return prop.imageThree
            }
        }
    }

    if(prop === undefined || imageSelector() === undefined || process.env.REACT_APP_BACKEND_URL === undefined || prop.id === 0){
        return (
            <div>
            </div>
        )
    } else {
        if(imageSelector() === "") {
            return (
                <div className="photo-option">
                    <div className="photo-option-presentation">
                        <label>photo {idPhoto} :</label>
                        <input type="file" onChange={handleChangeImage} key={keyInput}/>
                        <div className="button-field">
                            <button className="button-alert" onClick={handleCreateImage}>Ajouter</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="photo-option">
                    <div>
                        <div className="photo-option-presentation">
                            <label>photo {idPhoto} :</label>
                            <img src={process.env.REACT_APP_BACKEND_URL + imageSelector()} alt={`Illustration numéro ${idPhoto} du projet ${adminProjectContext?.adminProject.projectNameFrench}`} />
                        </div>
                        <input type="file" onChange={handleChangeImage} key={keyInput}/>
                    </div>
                    <div className="button-field">
                        <button className="button-alert" onClick={handleUpdateImage}>Modifier</button>
                        <button className="button-alert delete" onClick={handleDeleteImage}>Supprimer</button>
                    </div>
                </div>
            )
        }

    }
}

export default ProjecImageOption;