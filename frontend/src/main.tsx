import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Error from './components/Error'
import Home from './components/Home'
import Browse from './components/Browse'
import Form from './components/Form'
import Favourites from './components/Favourites'
import Weekendpicks from './components/Weekendpicks'
import Login from './components/Login.tsx'
import Signup from './components/Signup.tsx'
import './index.css'

import App from './App.tsx'



let routers = createBrowserRouter([

{
  path:'/',
  element:<App/>,
  errorElement:<Error/>,
  children:[
    {
index:true,
element:<Home/>
    },
    {
path:"browse",
element:<Browse/>
    },
    {
      path:'add',
      element:<Form/>
    },
    {
      path:'favourites',
      element:<Favourites/>
    },
    {
      path:'picks',
      element:<Weekendpicks/>
    },

    {
      path:'login',
      element:<Login/>
    },

    {
      path:'signup',
      element:<Signup/>
    },

    
  ]
}

])

createRoot(document.getElementById('root')!).render(
   
    <RouterProvider router={routers} />
 
)
