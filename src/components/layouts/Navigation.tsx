import { useState } from "react"
import Menu from "./Menu";

interface NavigationProps {
    section: string;
}

function Navigation(props: NavigationProps) {

    const [isOpen, setOpen] = useState(false);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);

    const toggleOpen = (event: React.MouseEvent<HTMLElement>) => {

        if(hasBeenOpened === false) {
            setHasBeenOpened(true);
            console.log(hasBeenOpened)
        }

        setOpen(!isOpen);
    }

    return (
        <nav className={ props.section }>
            { isOpen === true ? (<Menu />) : null}
            <div onClick={ toggleOpen } className={ hasBeenOpened ? (isOpen === false ? 'openButton closed' : 'openButton opened') : 'openButton'}>
            </div>
        </nav>
    )
}


export default Navigation