import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Pijamas from "./pages/Pijamas/Pijamas";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        children:[
            {
                index:true,
                element:<></>
            },
            {
                path:"/feedback",
                element: <Feedback />
            },
            {
                path:"/cadastro",
                element:<Cadastro />
            },
            {
                path:"/pijamas",
                element:<Pijamas />
            },
            {
                path:"/pijamas/:pijamaTipo",
                element:<Pijamas />
            },
            {
                path:"/pijama",
                element:<></>
            },
            {
                path:"/favorito",
                element:<></>
            },
            {
                path:"/carrinho",
                element:<></>
            },
            {
                path:"/homepage",
                element:<></>
            },
            {
                path:"/login",
                element:<Login />
            }
        ]
    }
])

export default router