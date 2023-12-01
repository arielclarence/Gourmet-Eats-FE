function UserComponent(props){  
    return(
        <tr>
            <td>{props.user.id}</td>
            <td>{props.user.username}</td>
        </tr>
    )
}

export default UserComponent;