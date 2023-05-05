import { Link } from "react-router-dom";
import gitImg from '../../assets/images/svg/github.svg'

interface ButtonProps {
    type: number;
    link: string;
    text: string;
}

const UNAVAILABLE = 0;
const GITHUB = 1;
const LIVE = 2;
const BEFORELIVE = 3;


function Button(props: ButtonProps) {

    const classnames = () => {
        if(props.type === UNAVAILABLE) {
            return 'button unavailable'
        } else if (props.type === GITHUB) {
            return 'button github'
        } else if (props.type === LIVE || BEFORELIVE) {
            return 'button live'
        }
    }

	return (
        <div className='singleButton'>
        {props.type === UNAVAILABLE ? (
            <div className={classnames()}>
                {props.text}
            </div>
        ) : props.type === GITHUB ? (
            <Link to = {props.link}>
                <div className={classnames()}>
                    <img src={gitImg} alt='Logo de Github'/>
                    {props.text}
                </div>
            </Link>
        ) : props.type === LIVE ? (
            <a href = {props.link}>
                <div className={classnames()}>
                    {props.text}
                </div>
            </a>
        ) : (
            <Link to = {props.link}>
                <div className={classnames()}>
                    {props.text}
                </div>
            </Link>
        )}</div>

    )
}

export default Button