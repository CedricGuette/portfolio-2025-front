interface CapacityProps {
    image: string;
    name: string;
    value: string;
}

function Capacity(props : CapacityProps) {

    const valueToClassName = () => {
        if(props.value === '05') {
            return 'bar five'
        } else if(props.value === '10') {
            return 'bar ten'
        } else if(props.value === '15') {
            return 'bar fiveteen'
        } else if(props.value === '20') {
            return 'bar twenty'
        } else if(props.value === '25') {
            return 'bar twenty-five'
        } else {
            return 'bar zero'
        }
    }

    return(
        <div className="capacity">
            <img src={ props.image } alt={ props.name } />
            <span className="valueName">{ props.name }</span><div className={ valueToClassName() }></div><span className="value">{ props.value }/25</span>
        </div>
    )

}

export default Capacity
