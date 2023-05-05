import { Link } from "react-router-dom";

function LaPanthere() {
    return (
        <div><Link to='../portfolio'>Retour au portfolio</Link><a href='../lapantherebefore/'>AVANT</a> <a href='../lapanthereafter/'>APRES</a> <a href='../lapanthereafter/rapport.pdf'>RAPPORT</a></div>
    )
}

export default LaPanthere;
