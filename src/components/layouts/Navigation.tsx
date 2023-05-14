import { useState } from "react"
import Menu from "./Menu";

function Navigation() {

    const [isOpen, setOpen] = useState(false);

    const toggleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(!isOpen);
    }

    return (
        <nav>
            <div onClick={ toggleOpen } className={ isOpen === false ? 'openButton' : 'openButton opened'}>
            </div>
            { isOpen === true ? (<Menu />) : null}
        </nav>
    )
}


export default Navigation