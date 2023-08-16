import "./css/App.css";
import RoleProvider from "./data/RoleProvider";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <RoleProvider>
      <AppRoutes />
    </RoleProvider>
  );
}

export default App;
