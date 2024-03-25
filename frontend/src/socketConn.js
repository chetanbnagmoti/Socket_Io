import io from "socket.io-client"

const ENDPOINT = "http://localhost:8000"

const socket = io.connect(ENDPOINT)

export default socket

export function socket_init() {
  console.log("connected to socket")
}
