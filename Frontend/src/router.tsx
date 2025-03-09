import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Pijamas from "./pages/Pijamas/Pijamas";

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