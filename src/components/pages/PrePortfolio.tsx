import presentationData from '../../datas/presentation.json';
import { LangContext } from '../utils/context/LangProvider';
import { useContext } from 'react';
import ProjectCard from '../sheets/ProjectCard';
import jsonData from '../../datas/portfolio.json';
import { Link } from 'react-router-dom';
import Navigation from '../layouts/Navigation';

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

    const lastProject = jsonData.length - 1;

    return(
        <div className='prePortfolio'>
            <Navigation section='prePortfolioNav'/>
            <div className="projectCard">
                <ProjectCard  project={ jsonData[lastProject] } index={0}/>
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
                <ProjectCard  project={ jsonData[lastProject - 1] } index={1}/>   
            </div>
        </div>
    )
}

export default PrePortfolio;
