import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewProfile from "./components/user/View";
import EditProfile from "./components/user/Edit";
import ChangePassword from "./components/user/ChangePassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/edit/Profile" element={<EditProfile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
