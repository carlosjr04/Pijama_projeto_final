import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

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
                element:<></>
            },
            {
                path:"/homepage",
                element:<></>
            }
        ]
    }
])

export default router