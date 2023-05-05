import jsonData from '../../datas/portfolio.json'
import ProjectCard from "../sheets/ProjectCard";

function Portfolio() {


	return (
        <article>
            {jsonData.map((data, index) => (
                <ProjectCard key={`${ index }-${ data.int.name }`} project={ data } index={index}/>
                )
            )}   
        </article>
    );
}

export default Portfolio;
