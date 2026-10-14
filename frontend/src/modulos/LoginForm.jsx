import React, {useState} from 'react'; // useState, funcion de react que nos permite almacenar y actualizar variables dentro del mismo componente.
import './LoginFormEstilo.css'

// Declaramos usando const para variables cuyo valor asignado no se puede reasignar una vez que se les ha dado un valor por primera vez

export const LoginForm = () => { // Exporta el componente para poder importarlo y mostrarlo en App.jsx
    const [credenciales, setCredenciales] = useState ({nombreUsuario: '', contrasena: ''}); // Credential: Objeto que guarda los dos campos necesarios para la API de inicio de sesion, usuario y contrasena, se inicializan como cadenas vacias.
    const [mensaje, setMensaje] = useState(''); // Aqui guardaremos textos informativos para indicar si se pudo inicar sesion o si fallaron.

    // Esta funcion captura los datos que el usuario escribe.
    const handleChange = (evento) => {
        setCredenciales({
            ...credenciales, // Conserva los operadores previos del otro campo sin sobreesccribir.
            [evento.target.name]: evento.target.value, // Detecta cual campo cambio.
        });
    };

    // Funcion para enviar los datos a Django 
    const handleSubmit = async (evento) => {
        evento.preventDefault(); // Cancela el comportamiendo por defecto de HTML, evita que la pagina se recargue totalmente
        setMensaje('');

        try{
            const respuestaServidor = await fetch('http://127.0.0.1:8000/api/login/', { // Fetch envia la solicitud con el metodo POST y la cabecera Content-type: application/json, indicando que el objeto credentialsse envia codificado en formato json.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: credenciales.nombreUsuario, // Convierte el objeto credenciales a formato JSON para enviarlo al backend.
                    password: credenciales.contrasena,
                }),
            });

            // respuestaServidor.ok, Si la api de Django valida qie los datos del usuario son correctos guarda los tokens devueltos, data.acces y data.refresh en el localStorage del navegador para mentener sesion iniciada.
            const datos = await respuestaServidor.json();

            if(respuestaServidor.ok){
                
                // Leemos el JSON cuando la respuesta fue exitosa
                const datos = await respuestaServidor.json();

                localStorage.setItem('accesToken', datos.access); // Guarda los tokens devueltos por la API de Django en el localStorage del navegador para mantener la sesion iniciada.
                localStorage.setItem('refreshToken', datos.refresh);
                setMensaje('¡Inicio de sesion exitoso!');

                //Update

            } else if (respuestaServidor.status === 401 ){
                // Django recibe la peticion pero las credenciales no son validas
                setMensaje('Error: ¡Usuario y contraseña, incorrectos!'); 
            } else if (respuestaServidor.status >= 500){
                // 5xx: fallo interno del servidor.
                setMensaje('Error del servidor. Intenta nuevamente.')
            } else {
                // Peticion no valida.
                setMensaje('No se pudo iniciar sesión. Revisa los datos ingresados.')
            }

            //endUpdate
        } catch (err){
            setMensaje('¡Error de conexión con el servidor backend!')
        }
    };

    // Retornamos las etiquetas con la estructura del formulario:

    return ( // Indica lo que el componente va a pintar en la pantalla.
        <div className="ventana-de-login">
            <h2>Iniciar Sesión</h2> 

            <form onSubmit={handleSubmit}>
                <div className="form-group"> 
                    <label>Usuario:</label>
                    <input
                        type="text"
                        name="nombreUsuario"
                        value={credenciales.nombreUsuario}
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className="form-group"> 
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="contrasena"
                        value={credenciales.contrasena}
                        onChange={handleChange}
                        required
                    
                    />
                </div>

                <button type ="submit" className="boton-login">Ingresar</button> 

                {mensaje && <p className="mensaje-login">{mensaje}</p>} 
            </form>
        </div>
    );
    // Boton de enviar, al hacer click se activa el evento onSubmit del formulario y llama a la funcion handleSubmit que envia los datos al backend.
    // Si mensaje tiene contenido, se muestra en un parrafo con la clase mensaje-login, que indica si el inicio de sesion fue exitoso o si hubo un error.
}