import photo from '../../../assets/images/intophoto.jpg';

function TriplePhoto() {

    return (
        <div className='triplePhoto'>
            <div className='squareOne'><img src={ photo } alt="Cédric Guetté" /></div>
            <div className='squareTwo'><img src={ photo } alt="Cédric Guetté" /></div>
            <div className='squareThree'><img src={ photo } alt="Cédric Guetté" /></div>
        </div>
    )
}

export default TriplePhoto;
