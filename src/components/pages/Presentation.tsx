import Header from '../layouts/Header';
import PresentationText from '../sheets/PresentationText';


function Presentation() {
	return (
        <article className='scroller'>
            <section className='one'>
                <Header />
                <PresentationText />
            </section>
            <section className='two'>
                <div className="jrpgstat">
                    <video autoPlay muted loop id="backgroundVideo">
                        <source src="./videos/bois.mp4" type="video/mp4" />
                    </video>
                    <div className="header">
                        <div className="title"><h2><img src="./images/jrpg/misc/armor.svg" alt="Armor" /> Stats de Cédric</h2></div>
                        <div className="faces">
                            <h3>Artéfacts :</h3>
                            <div className="face"><img src="./images/jrpg/misc/photo.png" alt="Fujifilm XT-3" /></div>
                            <div className="face"><img src="./images/jrpg/misc/ps.png" alt="Adobe Photoshop" /></div>
                            <div className="face"><img src="./images/jrpg/misc/pr.png" alt="Adobe Premiere Pro" /></div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="stats">
                            <div className="head">
                                <img src="./images/jrpg/photos/head.png" alt="Cédric Guetté" />
                                <div className="nameHPandMana">
                                    <div className="namePC">
                                        <p className="name">Cédric Guetté</p>
                                        <p className="PC"> PC 93</p>
                                    </div>
                                    <div className="HP">
                                        <p className="points">HP 4911</p>
                                        <div className="bar"></div>
                                    </div>
                                    <div className="mana">
                                        <p className="points">Mana 3313</p>
                                        <div className="bar"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="skills">
                                <h3>Développeur fullstack</h3>
                                <div className="capacities">
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/html.png" alt="html" />
                                        <span className="valueName">HTML</span><div className="bar twenty-five"></div><span className="value">25/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/css.png" alt="css" />
                                        <span className="valueName">CSS</span><div className="bar twenty-five"></div><span className="value">25/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/js.png" alt="js" />
                                        <span className="valueName">JavaScript</span><div className="bar twenty-five"></div><span className="value">25/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/typescript.png" alt="typescript" />
                                        <span className="valueName">TypeScript</span><div className="bar fiveteen"></div><span className="value">15/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/sass.png" alt="sass" />
                                        <span className="valueName">Sass</span><div className="bar twenty-five"></div><span className="value">25/25</span> 
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/react.png" alt="react" />
                                        <span className="valueName">React.js</span><div className="bar twenty"></div><span className="value">20/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/node.png" alt="node" />
                                        <span className="valueName">Node.js</span><div className="bar twenty"></div><span className="value">20/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/express.png" alt="express" />
                                        <span className="valueName">Express.js</span><div className="bar twenty"></div><span className="value">20/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/mongodb.png" alt="mongodb" />
                                        <span className="valueName">MongoDb</span><div className="bar twenty"></div><span className="value">20/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/php.png" alt="php" />
                                        <span className="valueName">PHP</span><div className="bar ten"></div><span className="value">10/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/sql.png" alt="sql" />
                                        <span className="valueName">SQL</span><div className="bar fiveteen"></div><span className="value">15/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/angular.png" alt="angular" />
                                        <span className="valueName">Angular.js</span><div className="bar five"></div><span className="value">05/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/java.png" alt="java" />
                                        <span className="valueName">Java</span><div className="bar five"></div><span className="value">05/25</span>
                                    </div>
                                    <div className="capacity">
                                        <img src="./images/jrpg/capacities/spring.png" alt="spring" />
                                        <span className="valueName">Spring</span><div className="bar five"></div><span className="value">05/25</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="equipment">
                            <h3>Armes</h3>
                            <div className="weapons">
                                <div className="weapon">
                                    <img src="./images/jrpg/weapons/sword_1.png" alt="sword" />
                                    <span className="value">Première arme en autodidacte</span>
                                </div>
                                <div className="weapon">
                                    <img src="./images/jrpg/weapons/sword_2.png" alt="sword" />
                                    <span className="value">Cours libres sur le site du zéro</span>
                                </div>
                                <div className="weapon">
                                    <img src="./images/jrpg/weapons/sword_3.png" alt="sword" />
                                    <span className="value">Formation de développeur intégrateur web avec OpenClassrooms (Bac+2)</span>
                                </div>
                                <div className="weapon">
                                    <img src="./images/jrpg/weapons/sword_4.png" alt="sword" />
                                    <span className="value">Formation continue</span>
                                </div>
                            </div>
                            <h3>Récompense de la quête en cours</h3>
                            <div className="weapons">
                                <div className="weapon disabled">
                                    <img src="./images/jrpg/weapons/sword_5.png" alt="sword" />
                                    <span className="value">Formation de concepteur développeur web avec O'clock (Bac+3/4)</span>
                                </div>
                            </div>
                        </div>
                        <div className="caracter">
                            <img src="./images/jrpg/photos/fullbody.png" alt="Cédric Guetté" />
                        </div>
                    </div>
                    <div className="footer">
                        <div className="others">
                            <h3>Langages parlés:</h3>
                            <div className="other">
                                <img src="./images/jrpg/flags/fr.jpg" alt="Drapeau de la France" />
                                <img src="./images/jrpg/flags/br.jpg" alt="Drapeau du Brésil" />
                                <img src="./images/jrpg/flags/perfide.jpg" alt="Drapeau de l'Albion" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='three'></section>
            <section className='four'></section>

        </article>
    )
}

export default Presentation
