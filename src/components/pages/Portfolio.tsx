import Footer from '../layouts/Footer';
import FreeSpace from '../layouts/FreeSpace';
import Header from '../layouts/Header';
import ProjectCard from '../sheets/ProjectCard';
import { useContext, useState } from 'react';
import { ProjectType } from '../../datas/Project';
import { useEffect } from 'react';
import { AlertBoxContext } from '../utils/context/AlertBoxContext';

function Portfolio() {

    const alertBox = useContext(AlertBoxContext);

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
    
        const [project, setProject] = useState<Array<ProjectType>>([emptyProject])
        
        useEffect(() => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/project`,
                {
                method : "GET",
            }) 
            .then((response) => response.json())
            .then((data) => {
                setProject(data);
            })
            .catch((error) => {
                alertBox?.setAlertBoxType("error");
                alertBox?.setAlertBox(error.toString());
            });
        }, [alertBox]);


	return (
        <div className="app-body">
            <Header />
            <main>
                <article className='portfolio'>
                    {project.map((data, index) => (
                        <ProjectCard key={`${ index }-${ data.projectDescriptionEnglish }`} props={ data } index={index}/>
                        )
                    )}   
                </article>
                <FreeSpace />
            </main>
            <Footer />
        </div>
    );
}

export default Portfolio;
