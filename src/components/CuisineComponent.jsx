function CuisineComponent(props){  
    return(
        <tr>
            <td>{props.cuisine.id}</td>
            <td>{props.cuisine.cuisineName}</td>
        </tr>
    )
}

export default CuisineComponent;