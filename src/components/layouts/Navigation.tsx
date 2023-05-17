import { useState } from "react"
import Menu from "./Menu";

function Navigation() {

    const [isOpen, setOpen] = useState(false);

    const toggleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(!isOpen);
    }

    return (
        <nav>
            { isOpen === true ? (<Menu />) : null}
            <div onClick={ toggleOpen } className={ isOpen === false ? 'openButton closed' : 'openButton opened'}>
            </div>
        </nav>
    )
}


export default Navigation