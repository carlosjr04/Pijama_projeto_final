import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Cart from "./pages/Cart/Cart";

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
                element:<></>
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