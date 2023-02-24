import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

const App = () => {

    const [tareas, setTareas] = useState([]);
    const [descripcion, setDescripcion] = useState("");
    const [input, setInput] = useState(false)
    //const [actualizar, setActualizar] = useState({
    //    idTarea:'', descripcionTarea:'', fecha:''
    //})
    
    const showTareas = async () => {
        setInput(false)
        const response = await fetch("api/Tarea/List")
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            setTareas(data);
            console.log(data)
        } else {
            console.log("status code " + response.status);
        }

    }

    const formDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + '|' + hora
    }

    useEffect(() => {
        showTareas()
    }, [])

    const guardarTarea = async (e) => {
        e.preventDefault()
        const response = await fetch("api/Tarea/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ description: descripcion })
        })
        if (response.ok) {
            setDescripcion("");
            await showTareas()
        }
    }

    const cerrarTarea = async (id) => {
        
        const response = await fetch("api/Tarea/Cerrar/" + id, {
            method: "DELETE"
        })
        if (response.ok) {
            await showTareas()
        }
    }

    //const actualizarTarea = async (item) => {
    //    console.log(item)
    //    const response = await fetch("api/Tarea/Actualizar/" + item, {
    //        method: "PUT",
    //        headers: {
    //            'Content-Type': 'application/json;charset=utf-8'
    //        },
    //        body: JSON.stringify(item)
    //    })
    //    console.log(response)
    //    if (response.ok) {
    //        setDescripcion("");
    //        await showTareas()
    //    }
    //};

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">Lista de tareas</h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={guardarTarea}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ingrese la descripcion de la tarea"
                            />
                            <button className="btn btn-success" type="submit">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tareas.map(
                                (item) => (
                                    <div key={item.idTarea} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.description}</h5>
                                        <div className="d-flex flex-column justify-content-between">
                                            <small className="text-muted">{formDate(item.registerDate)}</small>
                                            {/*{input && <input type="text" placeholder="Edite esta tarea" defaultValue="item.description" className="form-control" />}*/}
                                            <div className="mt-2 d-flex justify-content-between">
                                                {/*{input && <button onClick={() => actualizarTarea(item)} className="btn btn-sm btn-outline-warning">Actualizar</button>}*/}
                                                {/*<button*/}
                                                {/*    onClick={() => setInput(true)}*/}
                                                {/*    className="btn btn-sm btn-outline-info"*/}
                                                {/*>*/}
                                                {/*    Editar*/}
                                                {/*</button>*/}
                                                <button
                                                    onClick={() => cerrarTarea(item.idTarea)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>    
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;