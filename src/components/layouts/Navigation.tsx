import { useCallback } from 'react';
import Menu from './Menu';
import { useContext } from 'react';
import { MenuIsOpen, defineDefaultMenuIsOpen } from '../utils/context/MenuProvider';

interface NavigationProps {
    section: string;
}

function Navigation(props: NavigationProps) {

    const menuContext = useContext(MenuIsOpen); 

    const windowOpen = useCallback( () => {
        return menuContext?.isOpen ? menuContext?.isOpen : defineDefaultMenuIsOpen()
   },[menuContext] );

    const toggleOpen = (event: React.MouseEvent<HTMLElement>) => {

        menuContext?.setMenuOpen([!windowOpen()[0], true]);
    }

    return (
        <nav className={ props.section }>
            { windowOpen()[0] === true ? (<Menu />) : null}
            <div onClick={ toggleOpen } className={ windowOpen()[1] ? (windowOpen()[0] === false ? 'openButton closed' : 'openButton opened') : 'openButton'}>
            </div>
        </nav>
    )
}


export default Navigation;
