import React from "react"
import socket from "./socketConn"
import addNotification from "react-push-notification"

function App() {
  const [room, setroom] = React.useState(null)
  const [orderNumber, setOrderNumber] = React.useState(null)

  const handlePlaceOrder = () => {
    const roomname = localStorage.getItem("room")
    socket.emit("placeOrder", { roomname, orderNumber })
  }

  React.useEffect(() => {
    const room = window.prompt("enter tectr")

    if (room !== null) {
      // join room
      localStorage.setItem("room", room)
      socket.emit("join", room)
    }

    socket.on("newOrder", (order) => {
      addNotification({
        title: `New Order Receive!`,
        message: `order Number is  ${order}`,
        duration: 7000,
        native: true,
      })
    })
  }, [])

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
        }}>
        <input
          type="text"
          placeholder="enter message"
          onChange={(e) => setOrderNumber(e.target.value)}
        />{" "}
        <button onClick={() => handlePlaceOrder()}>Send</button>
      </div>
    </>
  )
}

export default App
