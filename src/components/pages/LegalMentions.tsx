import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import FreeSpace from "../layouts/FreeSpace";
import Footer from "../layouts/Footer";
import miscData from '../../datas/misc.json';
import { useContext } from "react";
import { LangContext } from "../utils/context/LangProvider";

function LegalMentions(){

    const languageContext = useContext(LangContext); 
    const misc = () => {
        if(languageContext?.lang === 'EN'){
            return miscData.en
        } else if(languageContext?.lang === 'PT'){
            return miscData.pt
        } else {
            return miscData.fr
        }
    }

    return(
        <div className="app-body">
            <Header />
            <main className='notFound'>
                <Link to='/'> {misc().notfound.home}</Link>
                <p className="legal-mentions">
                    {misc().legalMentions.owned + "\n"}
                    {misc().legalMentions.contact + "\n"}
                    {misc().legalMentions.host + "\n"}
                </p>
            </main>
            <FreeSpace />
            <Footer />
        </div>)

}

export default LegalMentions;