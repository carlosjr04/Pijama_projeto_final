import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Pijamas from "./pages/Pijamas/Pijamas";
import HomePage from "./pages/HomePage/HomePage";
import Pijama from "./pages/Pijama/Pijama";

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
                element:<Pijamas/>
            },
            {
                path:"/pijamas/:pijamaTipo",
                element:<Pijamas/>
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
            }
        ]
    }
])

export default router