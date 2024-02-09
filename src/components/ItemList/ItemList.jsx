import Item from "../Item/Item"

const ItemList = ({ equipos }) => {
    return(
        <div>
            {
                equipos.map(equipo => {
                    return (
                        <Item key={equipo.id} {...equipo}/>
                    )
                })
            }
        </div> 
    )
}

export default ItemList