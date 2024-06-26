import { Server, Socket } from 'socket.io'

export const desconectar = (cliente:Socket) => {

    cliente.on('disconnect',() => {
        console.log("Cliente desconectado");
    });
}

//Escuchar mensajes
export const mensaje = (cliente:Socket, io: Server) => {

    cliente.on('mensaje',(payload: {de:string,cuerpo:string}) => {

        console.log("mensaje recibido", payload);

        io.emit('mensaje-nuevo',payload);
    });
}