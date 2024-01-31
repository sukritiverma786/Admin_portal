import { Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import "./App.css";
import SignUp from "./SignUp";
import Login from "./Login";
import AdminUser from "./AdminUser";
import Home from "./Home";
import UpdateUser from "./UpdateUser";
import Todo from "./Todo";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // return (

  return (
    <>
      <div className="App">
        <Nav />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminUser />} />
        {/* <Route path="/update" element={<UpdateUser />} /> */}
        {/* <Route path="/update-user/:id" element={<UpdateUser/>} /> */}
        <Route path="/update/:id" element={<UpdateUser />} />
        <Route path="/Todo/:id" element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
