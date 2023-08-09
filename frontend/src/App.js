import "./App.css";
import UserPanel from "./components/UserPanel";
import AdminPanel from "./components/AdminPanel";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">{isLoggedIn ? <AdminPanel /> : <UserPanel />}</div>
  );
}

export default App;
