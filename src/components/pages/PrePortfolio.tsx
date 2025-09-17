import presentationData from '../../datas/presentation.json';
import { LangContext } from '../utils/context/LangProvider';
import { useContext, useEffect, useState } from 'react';
import ProjectCard from '../sheets/ProjectCard';
import { Link } from 'react-router-dom';
import Navigation from '../layouts/Navigation';
import { AlertBoxContext } from '../utils/context/AlertBoxContext';
import { ProjectType } from '../../datas/Project';

function PrePortfolio() {
    const languageContext = useContext(LangContext);

    const presentation = () => {
        if(languageContext?.lang === 'EN'){
            return presentationData.en
        } else if(languageContext?.lang === 'PT'){
            return presentationData.pt
        } else {
            return presentationData.fr
        }
    }

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

    const [project, setProject] = useState<Array<ProjectType>>([emptyProject, emptyProject])
    
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

    return(
        <div className='prePortfolio'>
            <Navigation section='prePortfolioNav'/>
            <div className="projectCard">
                {project.length >= 1 ?<ProjectCard  props={ project[project.length - 1] } index={0}/> : ""}
            </div>
            <div className="preProtfolioText">
                <h2>{ presentation().title4 } :</h2>
                <p>
                    { presentation().content4 }
                </p>
                <div className="links">

                    <Link to='./portfolio'>
                        <div className="button">
                            { presentation().myPortfolio }
                        </div>
                    </Link>
                    <a href='https://github.com/CedricGuette/'>
                        <div className="button">
                            { presentation().myGithub }
                        </div>
                    </a>    
                </div>
            </div>
            <div className="projectCard second">
                {project.length >= 2 ? <ProjectCard  props={ project[project.length - 2] } index={1}/> : ""}
            </div>
        </div>
    )
}

export default PrePortfolio;
