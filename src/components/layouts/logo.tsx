import flower from '../../assets/images/flowerlogo.png'

function Logo() {
	return (
            <div className='logo'>
                <div className="image"><img src={ flower } alt="flower" /></div>
                <div className="text">
                    <span className="name">Cédric Guetté</span>
                    <span className="function">Développeur Fullstack</span>
                </div>
            </div>
    )
}

export default Logo
