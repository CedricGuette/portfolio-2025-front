interface WeaponProps {
    image: string;
    text: string;
}


function Weapon(props: WeaponProps) {

    return(
        <div className="weapon">
            <img src={ props.image } alt='sword' />
            <span className="value">{ props.text }</span>
        </div>
    )
}

export default Weapon;
