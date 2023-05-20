import jsonData from '../../datas/portfolio.json';
import Footer from '../layouts/Footer';
import FreeSpace from '../layouts/FreeSpace';
import Header from '../layouts/Header';
import ProjectCard from '../sheets/ProjectCard';

function Portfolio() {


	return (
        <div className="app-body">
            <Header />
            <main>
                <article className='portfolio'>
                    {jsonData.map((data, index) => (
                        <ProjectCard key={`${ index }-${ data.int.name }`} project={ data } index={index}/>
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
