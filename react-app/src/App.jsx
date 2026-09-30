import {useState} from "react";
//Importacion

/* Lista  inicial */
const initialOrders = [{"id":1 , "dish":"Pollo" , "status":"pending"},
                {"id":2 , "dish":"Carne" , "status":"pending"},
                {"id":3 , "dish":"Pescado" , "status":"pending"}];

/* Primer componente*/
function Pedido(){
  /* Estados iniciales */
  const [newDish, setNewDish] = useState("");
  const [listaPedidos, setListaPedidos] = useState(initialOrders);

  /* Filtrados de lista */
  const ordersPending = listaPedidos.filter((order)=> order.status === "pending") 
  const lenghtOrdersPending = ordersPending.length

  const ordersCompleted = listaPedidos.filter((order)=> order.status === "completed") 

  const agregarPedido= ()=> {
    //Validar
    if (newDish.trim() === ""){
      return;
    }

    //Creamos objeto para pedido
    const nuevoObjeto = {
      id: Date.now(),    // Genera un ID único con la fecha/hora en milisegundos
      dish: newDish.trim(),     // El texto que el usuario escribió
      status: "pending"  // Por defecto nace pendiente
    };

    //Actualizar estados
    setListaPedidos([...listaPedidos, nuevoObjeto]);
    setNewDish("")

  };

  

  /* Funcion completar pedido por id */
  const completarPedido = (idABuscar) => {
    const listaActualizada = listaPedidos.map((order) => {

      // Si el id coincide con el que le dimos clic...
      if (order.id === idABuscar) {

        // Devolvemos una copia de esa orden pero cambiando el status a "completed"
        return { ...order, status: "completed" };
      }
      // Si no es el id que buscamos, devolvemos la orden exactamente como estaba
      return order;
    });

    // Guardamos la lista actualizada en el estado
    setListaPedidos(listaActualizada);
  };

  /* Lo que retorna el componente */
  return (
    <div>
      <input placeholder="Ingrese plato deseado" value={newDish} onChange={(e)=> setNewDish(e.target.value)}/>
      <button  onClick={agregarPedido} >Agregar Pedido</button> {/* Aqui va la funcion de agregar pedido escrito en lista */}

      {/* Opcion para pedidos pendientes, y mensaje */}
      {lenghtOrdersPending > 0 && <h3>Pedidos pendientes</h3>}

      <ul>
        {ordersPending    
        .map((order)=> <li key={order.id}>{order.dish} <button onClick={()=> completarPedido(order.id)}>Completar</button> </li> )} 
        {/* Aqui boton de completar que cambia estado */}

      </ul>
      
      {lenghtOrdersPending > 0 ? "Tienes " + lenghtOrdersPending + " pedidos pendientes por preparar" : "¡Todo al día! No hay pedidos pendientes"}  

      {/* Mostrar pedidos completos del dia */}
      {ordersCompleted.length > 0 && 
      <div>
        <h3>Pedidos completos del dia</h3> 
        <ul>
          {ordersCompleted.map((pedido)=> <li key={pedido.id}> {pedido.dish} </li> )}

        </ul>
      </div> }


    </div>
    
  ); 

}

// Estructura de pagina
export default function App(){
  return(
    <div>
      <h1>Gestor de Pedidos para un Restaurante (Mini Dashboard)</h1>
      

      {/*Llamada a componente*/}
      <Pedido> </Pedido>
            
    </div>
  );
} 