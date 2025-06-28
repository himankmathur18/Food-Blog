import { createBrowserRouter, RouterProvider } from 'react-router-dom';  
import Home from './pages/Home';
import MainNavigation from './component/MainNavigation'
import axios from 'axios'
import './App.css'
import AddFoodRecipe from './pages/AddFoodRecipe';

function App() {
  const getAllRecipes = async () => {
    try{
      let allRecipes = []
      await axios.get("http://localhost:5000/recipe").then(res =>{
       allRecipes=res.data
      })
      return allRecipes;
    }catch(error){
      console.error(error);
    }
  }
const getMyRecipes=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

  const router = createBrowserRouter([
    {path:"/", element:<MainNavigation/>, children: [
      {path:"/", element:<Home/>, loader:getAllRecipes},
      {path:"/Recipe",element:<Home/>,loader:getMyRecipes},
      {path:"/favRecipe", element:<Home/> },
      {path:"/addRecipe", element:<AddFoodRecipe/> },
    ]}
  ])

  
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
