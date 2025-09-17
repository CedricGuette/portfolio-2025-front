import { ProjectType } from "../../../datas/Project";
import { useContext } from "react";
import { AdminProjectContext } from "../../utils/context/AdminProjectProvider";

function ProjectSample({prop, projectLanguage, empty} : {prop : ProjectType, projectLanguage: string, empty: ProjectType}) {

    const adminProjectContext = useContext(AdminProjectContext);

    const handleSelect = () =>  {
        if(adminProjectContext !== null) {
            if(adminProjectContext?.adminProject.id === prop.id){
                adminProjectContext.setAdminProject(empty);
                adminProjectContext.setFocusedProject(empty.id);
            } else {
                adminProjectContext.setAdminProject(prop);
                adminProjectContext.setFocusedProject(prop.id);
            }
        }
    }

    return(
        <div className={`project ${adminProjectContext?.focusedProject === prop.id ? (prop.id === 0 ? "newSelected" : "selected") : ""}`} onClick={handleSelect}>
            <div className="project-title">
                { projectLanguage === "fr" ? prop.projectNameFrench : (projectLanguage === "en" ? prop.projectNameEnglish : prop.projectNamePortuguese) }
            </div>
            <div className="project-description">
                { projectLanguage === "fr" ? prop.projectDescriptionFrench : (projectLanguage === "en" ? prop.projectDescriptionEnglish : prop.projectDescriptionPortuguese) }
            </div>
            <div className="project-technologies">
                { prop.projectTechnologies }
            </div>
        </div>
    )
}

export default ProjectSample;