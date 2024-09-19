import MyForm from "./components/MyForm/MyForm"
import MyUser from "./components/MyUser/MyUser"
import React from "react"
import "./App.css"

function App() {

  const [pageIs, setPageIs] = React.useState("form")

  return (
    <>
      <nav>
        <button onClick={() => setPageIs("form")}>Form</button>
        <button onClick={() => setPageIs("user")}>User</button>
      </nav>
      {pageIs=="form" ? <MyForm /> : pageIs=="user" ? <MyUser /> : <Error404 />}
    </>
  )
}

export default App
