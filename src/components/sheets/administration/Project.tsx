import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AlertBoxContext } from "../../utils/context/AlertBoxContext";
import ProjectSample from "./ProjectSample";
import { AdminProjectContext } from "../../utils/context/AdminProjectProvider";
import ProjecImageOption from "./ProjectImageOption";
import ProjectButtons from "./ProjectButtons";

function Project() {

    // On importe les contextes pour le bon fonctionnement des éléments
    const alertBox = useContext(AlertBoxContext);
    const adminProjectContext = useContext(AdminProjectContext);

    // On gère l'ouverture et la fermeture de la sous-catégorie
    const openClose = ">";
    const [openCloseState, setOpenCloseState] = useState(false);
    const handleOpenClose = () => {
        setOpenCloseState(!openCloseState);
    }

    // On crée un useState pour forcer le rendu
    const [forceRender, setForceRender] = useState(false);

    // UseState et fonction pour changer la langue des panneaux afin de rendre moins dense les entrées à l'écran
    const [projectLanguage, setProjectLanguage] = useState("fr");


    // On crée les fonctions pour gérer les différentes langues ainsi que les entrées dans les champs
    const handleProjectTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(adminProjectContext !== null){
            let newAdminProject = adminProjectContext.adminProject
            if(projectLanguage === "fr") {
                newAdminProject.projectNameFrench = event.target.value;
                adminProjectContext.setAdminProject(newAdminProject);
            } else if(projectLanguage === "en") {
                newAdminProject.projectNameEnglish = event.target.value;
                adminProjectContext.setAdminProject(newAdminProject);
            } else {
                newAdminProject.projectNamePortuguese = event.target.value;
                adminProjectContext.setAdminProject(newAdminProject);
            }
        }
        setForceRender(!forceRender);
    }

    const handleProjectDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(adminProjectContext !== null){
            let newAdminProject = adminProjectContext.adminProject
            if(projectLanguage === "fr") {
                newAdminProject.projectDescriptionFrench = event.target.value;
                adminProjectContext.setAdminProject(newAdminProject);
            } else if(projectLanguage === "en") {
                newAdminProject.projectDescriptionEnglish = event.target.value;
                adminProjectContext.setAdminProject(newAdminProject);
            } else {
                newAdminProject.projectDescriptionPortuguese = event.target.value;
                adminProjectContext.setAdminProject(newAdminProject);
            }
        }
        setForceRender(!forceRender);
    }

    const handleProjectTechnologies = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(adminProjectContext !== null){
            let newAdminProject = adminProjectContext.adminProject;
            newAdminProject.projectTechnologies = event.target.value;
            adminProjectContext.setAdminProject(newAdminProject);
        }
        setForceRender(!forceRender);
    }

    const handleProjectGitHubLink = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(adminProjectContext !== null){
            let newAdminProject = adminProjectContext.adminProject;
            newAdminProject.projectGitHubLink = event.target.value;
            adminProjectContext.setAdminProject(newAdminProject);
        }
        setForceRender(!forceRender);
    }

    const handleProjectLiveLink = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(adminProjectContext !== null){
            let newAdminProject = adminProjectContext.adminProject;
            newAdminProject.projectLiveLink = event.target.value;
            adminProjectContext.setAdminProject(newAdminProject);
        }
        setForceRender(!forceRender);
    }

    // Objet d'un projet vide
    const emptyProject = {
        "id": 0,
        "projectNameFrench": "",
        "projectDescriptionFrench": "",
        "projectNameEnglish": "",
        "projectDescriptionEnglish": "",
        "projectNamePortuguese": "",
        "projectDescriptionPortuguese": "",
        "projectTechnologies": "",
        "projectGitHubLink": "",
        "projectLiveLink": "",
        "imageOne": "",
        "imageTwo": "",
        "imageThree": ""
    };
    
    // On crée une requête pour récupérer les informations du serveur
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/project`,
            {
            method : "GET",
        }) 
        .then((response) => response.json())
        .then((data) => {
            adminProjectContext?.setProjects(data);
        })
        .catch((error) => {
            alertBox?.setAlertBoxType("error");
            alertBox?.setAlertBox(error.toString());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertBox]);

    // On crée les fonctions pour changer la langue
    const handleChangeLanguageFr = () => {
        if(projectLanguage !== "fr") {
            setProjectLanguage("fr");
        }
    }

    const handleChangeLanguageEn = () => {
        if(projectLanguage !== "en") {
            setProjectLanguage("en");
        }
    }

    const handleChangeLanguagePt = () => {
        if(projectLanguage !== "pt") {
            setProjectLanguage("pt");
        }
    }

    if(openCloseState === true) {
        return (
            <div className="admin-panel">
                <h2>Projets</h2>
                <div onClick={handleOpenClose} className="openClose"> {openClose} </div>
                <div className="admin-categories">
                    <div className="admin-sub-panel">
                        <div className="project-list">
                            {adminProjectContext?.projects.map((data, index) => (
                                <ProjectSample key={index} prop={data} projectLanguage={projectLanguage} empty={emptyProject}/>
                                )
                            )} 
                        </div>
                    </div>
                    <div className="language-selector">
                            Selection de la langue :
                            <div className="language" onClick={handleChangeLanguageFr}>FR </div>
                                | 
                            <div className="language" onClick={handleChangeLanguageEn}> EN </div>
                                | 
                            <div className="language" onClick={handleChangeLanguagePt}> PT</div>
                        </div>
                    <div className="admin-sub-panel">
                        <div className="project-option">
                            <div className="project-sub-option">
                                <label>Titres :</label>
                                <input type="text" onChange={handleProjectTitle} value={projectLanguage === "fr" ? 
                                        adminProjectContext?.adminProject.projectNameFrench 
                                        : (
                                            projectLanguage === "en" ? 
                                            adminProjectContext?.adminProject.projectNameEnglish
                                            : adminProjectContext?.adminProject.projectNamePortuguese
                                        )
                                    }></input>
                                <label>Descriptions :</label>
                                <textarea className="textarea text-description" onChange={handleProjectDescription} value={projectLanguage === "fr" ? 
                                        adminProjectContext?.adminProject.projectDescriptionFrench 
                                        : (
                                            projectLanguage === "en" ? 
                                            adminProjectContext?.adminProject.projectDescriptionEnglish
                                            : adminProjectContext?.adminProject.projectDescriptionPortuguese
                                        )
                                    }></textarea>
                                <label>Technologies :</label>
                                <textarea className="textarea text-technologies" onChange={handleProjectTechnologies} value={adminProjectContext?.adminProject.projectTechnologies}></textarea>
                            </div>
                            <div className="project-sub-option">
                                <label>Lien vers le repository GitHub: </label>
                                <input type="text" onChange={handleProjectGitHubLink} value={adminProjectContext?.adminProject.projectGitHubLink}></input>
                                <label>Lien vers la version live: </label>
                                <input type="text" onChange={handleProjectLiveLink} value={adminProjectContext?.adminProject.projectLiveLink}></input>
                                <div className="photo-field">
                                    <ProjecImageOption prop={adminProjectContext?.adminProject} idPhoto={1} />
                                    { adminProjectContext?.adminProject.imageOne === "" ? "" : <ProjecImageOption prop={adminProjectContext?.adminProject} idPhoto={2} />}
                                    { adminProjectContext?.adminProject.imageTwo === "" ? "" : <ProjecImageOption prop={adminProjectContext?.adminProject} idPhoto={3} />}
                                </div>
                            </div>
                        </div>
                        <ProjectButtons emptyProject={emptyProject}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="admin-panel">
                <h2>Projets</h2>
                <div onClick={handleOpenClose} className="openCloseClose"> {openClose} </div>
            </div>
        )
    }

}

export default Project;