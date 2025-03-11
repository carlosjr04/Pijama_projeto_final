import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";

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
                element:<></>
            },
            {
                path:"/cadrasto",
                element:<></>
            },
            {
                path:"/pijamas",
                element:<></>
            },
            {
                path:"/pijamas/:pijamaTipo",
                element:<></>
            },
            {
                path:"/pijama",
                element:<></>
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
                element:<></>
            }
        ]
    }
])

export default router