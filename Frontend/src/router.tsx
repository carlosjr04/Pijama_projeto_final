import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Pijamas from "./pages/Pijamas/Pijamas";
import HomePage from "./pages/HomePage/HomePage";
import Pijama from "./pages/Pijama/Pijama";
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
                element:<Login />
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
                path:"/pijama/:pijamaId",
                element:<Pijama/>
            },
            {
                path:"/favorito",
                element:<Favorites/>
            },
            {
                path:"/carrinho",
                element:<Cart/>
            },
            {
                path:"/homepage",
                element:<HomePage/>
            },
            {
                path:"/login",
                element:<Login />
            }
        ]
    }
])

export default router