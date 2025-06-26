import { createBrowserRouter, RouterProvider } from 'react-router-dom';  
import Home from './pages/Home';
import MainNavigation from './component/MainNavigation'
import axios from 'axios'
import './App.css'

function App() {
  const getAllRecipes = async () => {
    try{
      let allRecipes = []
      await axios.get("http://localhost:5000").then(res =>{
       allRecipes=res.data
      })
      return allRecipes;

    }catch(error){
      console.error(error);
    }
  }
  const router = createBrowserRouter([
    {path:"/", element:<MainNavigation/>, children: [
      {path:"/", element:<Home/>, loader:getAllRecipes},
      {path:"/myRecipe", element:<Home/> },
      {path:"/favRecipe", element:<Home/> },
    ]}
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
