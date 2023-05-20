
interface AppProps {
reversed: boolean;
}

function SlidingText(props: AppProps) {
 

	return (
        <div className= { props.reversed ? 'slidingText reversed' : 'slidingText'}>
            <div className="slidingBox">
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
                <span>CÉDRIC</span><span>GUETTÉ</span><span>DEVELOPPEUR</span><span>FULLSTACK</span>
            </div>
        </div>
    )
}

export default SlidingText;
