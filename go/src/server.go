package main

import (
    "fmt"
    "net/http"

    "code.google.com/p/go.net/websocket"
)

// Echo the data received on the WebSocket.
func EchoServer(ws *websocket.Conn) {
    var in []byte
    if err := websocket.Message.Receive(ws, &in); err != nil {
        panic("EchoServer: " + err.Error())
    }
    fmt.Printf("Received: %s\n", string(in))
    websocket.Message.Send(ws, in)
	fmt.Printf("Sent: %s\n", string(in))
}

// This example demonstrates a trivial echo server.
func main() {
    http.Handle("/echo", websocket.Handler(EchoServer))
    err := http.ListenAndServe(":8081", nil)
    if err != nil {
        panic("ListenAndServe: " + err.Error())
    }
}