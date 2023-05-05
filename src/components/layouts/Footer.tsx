import logo from '../../assets/images/logo11.png'


function Footer() {
	return (
        <footer>
            <div className='title-logo'>
                <img src={logo} alt='Logo de Cédric Guetté'/>
            </div>
            <span className='copyright'>Copyright, tous droits reservés à Cédric Guetté 2023 </span>
        </footer>
    )
}

export default Footer