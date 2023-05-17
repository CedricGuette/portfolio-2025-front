import ProjectCard from "../sheets/ProjectCard"
import jsonData from '../../datas/portfolio.json'
import { Link } from "react-router-dom";

function PrePortfolio() {

    const lastProject = jsonData.length - 1;

    return(
        <div className='prePortfolio'>
            <div className="projectCard">
                <ProjectCard  project={ jsonData[lastProject] } index={0}/>
            </div>
            <div className="preProtfolioText">
                <h2>Mes réalisations :</h2>
                <p>
                    Voici les deux dernières de mes réalisations.
                    Si vous souhaitez en voir plus, vous pouvez vous rendre sur mon GitHub, ou alors poursuivre la visite de mon site par mon portfolio complet.
                </p>
                <div className="links">

                    <Link to='./portfolio'>
                        <div className="button">
                            Mon Portfolio
                        </div>
                    </Link>
                    <a href='https://github.com/CedricGuette/'>
                        <div className="button">
                            Mon GitHub
                        </div>
                    </a>    
                </div>
            </div>
            <div className="projectCard">
                <ProjectCard  project={ jsonData[lastProject - 1] } index={1}/>   
            </div>
        </div>
    )
}

export default PrePortfolio
