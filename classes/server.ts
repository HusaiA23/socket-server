import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { Server } from 'socket.io';
import http from 'http'

import * as socket from '../sockets/sockets'

export default class MyServer{
    private static _instance: MyServer

    public app : express.Application;
    public port: number;    
    public io : Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer =  new http.Server(this.app)
        this.io = new Server(this.httpServer)
        this.io = require("socket.io")(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
              },            
          });
        this.escucharSockets()
    }

    public static get instance(){
        return this._instance || (this._instance = new this)
    }

    private escucharSockets(){
        console.log(`escuchando conexiones -- sockets`)

        this.io.on('connection', cliente =>{
            console.log(`nuevo cliente conectado`)
        //Mensajes
        socket.mensaje(cliente, this.io);
        //Desconectar
        socket.desconectar(cliente);
        
        })
    }

    start(callback:Function ) {
     //this.app.listen(this.port, callback());   
     this.httpServer.listen(this.port, callback());   

    }
}