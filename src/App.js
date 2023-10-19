import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const routers = createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {index: true,element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path: "Login",element: <Login/>},
    {path: "Register",element: <Register/>},
    {path: "*",element: <NotFound/>}
  ]}
])
function App() {
  return <RouterProvider router={routers} /> ;
    
 
}

export default App;
