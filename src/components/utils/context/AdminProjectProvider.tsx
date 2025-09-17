import { createContext, useState } from 'react';
import { ProjectType } from '../../../datas/Project'; 

type AdminProjectContextType = {
    projects: Array<ProjectType>;
    setProjects: React.Dispatch<React.SetStateAction<Array<ProjectType>>>;
    adminProject: ProjectType;
    setAdminProject: React.Dispatch<React.SetStateAction<ProjectType>>;
    focusedProject: number | null;
    setFocusedProject: React.Dispatch<React.SetStateAction<number | null>>;
    isCreating: boolean;
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

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
}

export const AdminProjectContext = createContext<AdminProjectContextType | null>(null);

export const AdminProjectContextProvider = (props: ContextProviderProps) => {

    const [projects, setProjects] = useState<Array<ProjectType>>([emptyProject]);
    const [adminProject, setAdminProject] = useState<ProjectType>(emptyProject);
    const [focusedProject, setFocusedProject] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

  return (
    <AdminProjectContext.Provider value={{ projects, setProjects, adminProject, setAdminProject, focusedProject, setFocusedProject, isCreating, setIsCreating }}>
        {props.children}
    </AdminProjectContext.Provider>
    )
}