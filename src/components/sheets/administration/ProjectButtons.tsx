import { useContext } from "react";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import { AdminProjectContext } from "../../utils/context/AdminProjectProvider";
import { ProjectType } from "../../../datas/Project";

function ProjectButtons({emptyProject}: {emptyProject: ProjectType}) {

    // On importe les contextes pour le bon fonctionnement des éléments
    const alertBox = useContext(AlertBoxContext);
    const adminProjectContext = useContext(AdminProjectContext);

        // On crée le fonctionnement globale du requêtage pour éviter les répétitions
    const apiRequest = async (url: string, method: string, headers: HeadersInit | undefined, body: string | Blob | undefined) =>{
        if(adminProjectContext !== null){
            let requestIsOk = false;
            try {
                await fetch(url, {
                    method: method,
                    headers : headers,
                    body: body
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

                        if(method === "POST"){
                            adminProjectContext?.setIsCreating(false);
                            adminProjectContext?.setAdminProject(emptyProject);
                            alertBox?.setAlertBox(data.created);
                        } else if(method === "DELETE"){
                            alertBox?.setAlertBox(data.deleted);

                            let existingWeapon = adminProjectContext.projects;
                            const index = existingWeapon.findIndex(object => object.id === adminProjectContext.adminProject.id);
                            existingWeapon?.splice(index, 1);

                            adminProjectContext.setFocusedProject(0);
                            adminProjectContext.setProjects(existingWeapon);
                            adminProjectContext.setAdminProject(emptyProject);
                        } else {
                            alertBox?.setAlertBox(data.updated);
                        }
                    } else {
                        alertBox?.setAlertBoxType("error");
                        alertBox?.setAlertBox(data.error);
                    }
                });
            } catch (error: any) {
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString());
            }
        }  else {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox("Le contexte n'est pas correctement chargé.");
        }
    }

    // On crée le corps pour les requêtes
    const body = JSON.stringify({
        "projectNameFrench": adminProjectContext?.adminProject.projectNameFrench,
        "projectDescriptionFrench": adminProjectContext?.adminProject.projectDescriptionFrench,
        "projectNameEnglish": adminProjectContext?.adminProject.projectNameEnglish,
        "projectDescriptionEnglish": adminProjectContext?.adminProject.projectDescriptionEnglish,
        "projectNamePortuguese": adminProjectContext?.adminProject.projectNamePortuguese,
        "projectDescriptionPortuguese": adminProjectContext?.adminProject.projectDescriptionPortuguese,
        "projectTechnologies": adminProjectContext?.adminProject.projectTechnologies,
        "projectGitHubLink": adminProjectContext?.adminProject.projectGitHubLink,
        "projectLiveLink": adminProjectContext?.adminProject.projectLiveLink
    })

    // Fonction pour envoyer la requête au back et créer de manière persistante le nouvel élément
    const handleSendNewProject = async () => {
        if(adminProjectContext !== null && adminProjectContext.adminProject.id === 0) {
            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/project/create`,
                "POST",
                { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                },
                body
            )
        }
    }

    //Fonction pour supprimer un élément 
    const handleDeleteExistingProject = async () => {
        if(adminProjectContext !== null && adminProjectContext?.focusedProject !== null) {
            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/project/${adminProjectContext.adminProject.id}`,
                "DELETE",
                { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                },
                undefined
            )
        }
    }

    //Fonction pour mettre à jour un élément 
    const handleUpdateProject = async () => {
        if(adminProjectContext !== null && adminProjectContext?.focusedProject !== null) {

            apiRequest(`${process.env.REACT_APP_BACKEND_URL}/api/project/${adminProjectContext.adminProject.id}`,
                "PUT",
                { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(`${localStorage.getItem('SESSION') !== null ? localStorage.getItem('SESSION') : ""}`).value
                },
                body
            )
        }
    }

    // Fonction pour supprimer le nouvel élément avant l'envoie au back 
    const handleDeleteNewProject = () => {
        if(adminProjectContext !== null){
            let existingProjects = adminProjectContext.projects;
            existingProjects.pop();
            adminProjectContext.setProjects(existingProjects);
            adminProjectContext.setIsCreating(false);
            adminProjectContext?.setAdminProject(emptyProject);
        }
    }

    // On crée un élément vide avec un id de 0 pour le modifier avant de l'envoyer au back
    const handleCreateNewProject = () => {
        if(adminProjectContext !== null){
            let existingProjects = adminProjectContext.projects;

            if(adminProjectContext !== null && adminProjectContext.adminProject.id === 0){
                existingProjects.push(adminProjectContext.adminProject);
            } else {
                existingProjects.push(emptyProject);
                adminProjectContext.setAdminProject(emptyProject);
            }

            adminProjectContext.setProjects(existingProjects);
            adminProjectContext.setFocusedProject(0);
            adminProjectContext.setIsCreating(true);
        }
    }

    return(
        <div className="button-field">
            {adminProjectContext?.isCreating ? (
                <button className="button-alert" onClick={handleSendNewProject}>Créer</button>
            ) : (
                <button className="button-alert" onClick={handleCreateNewProject}>Nouveau</button>
            )}
            <button className="button-alert" onClick={handleUpdateProject}>Modifier</button>
            {adminProjectContext?.isCreating ? (
                <button className="button-alert delete" onClick={handleDeleteNewProject}>Supprimer</button>
            ) : (
                <button className="button-alert delete" onClick={handleDeleteExistingProject}>Supprimer</button>
            )}
        </div>
    )

}

export default ProjectButtons;