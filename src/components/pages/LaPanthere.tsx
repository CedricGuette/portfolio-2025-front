import { Link } from "react-router-dom";

function LaPanthere() {
    return (
        <div><Link to='../portfolio'>Retour au portfolio</Link><a href='../../lapantherebefore/index.html'>AVANT</a> <a href='../../lapanthereafter/index.html'>APRES</a> <a href='../../lapanthereafter/rapport.pdf'>RAPPORT</a></div>
    )
}

export default LaPanthere;
