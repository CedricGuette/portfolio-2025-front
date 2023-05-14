function JrpgPlayerHead() {

    return(
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
    )
}

export default JrpgPlayerHead
