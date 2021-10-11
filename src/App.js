import {  useEffect, useState } from "react";
import { Route} from "react-router-dom"
import axios from "axios";

import Drawer from "./components/Drawer/index";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import AppContext from "./Context";
import Orders from "./components/pages/Orders";


function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened,setCartOpened] = useState(false)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    async function fetchData(){
     try {
       const [cartResponse,fevoritesResponse,itemsResponse] = await Promise.all([
        axios.get('https://615aee6b4a360f0017a8135c.mockapi.io/cart'),
        axios.get('https://615aee6b4a360f0017a8135c.mockapi.io/favorites'),
        axios.get('https://615aee6b4a360f0017a8135c.mockapi.io/items')
       ])
      
      
      setIsLoading(false)
      setCartItems(cartResponse.data)
      setFavorites(fevoritesResponse.data)
      setItems(itemsResponse.data)
     } catch (error) {
       alert("Ошибка при загрузке данных")
     }
      
    }
    fetchData()
  },[])

  const onAddToCart = async (obj) =>{
    try {
      const findItem = cartItems.find((item)=>Number(item.parentId)===Number(obj.id))
      if(findItem){
        setCartItems((prev)=>prev.filter((item)=>Number(item.parentId)!==Number(obj.id)))
       await axios.delete(`https://615aee6b4a360f0017a8135c.mockapi.io/cart/${findItem.id}`)
      }else{
        setCartItems(prev => [...prev,obj])
       const {data} = await axios.post('https://615aee6b4a360f0017a8135c.mockapi.io/cart',obj)
       setCartItems((prev) => prev.map(item =>{
         if(item.parentId===data.parentId){
           return{
             ...item,
             id: data.id
           }
         }
         return item 
       }) )
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину")
    }
    
   
  }

  const onRemoveItem = (id) =>{
   try {
    axios.delete(`https://615aee6b4a360f0017a8135c.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => Number(item.id) !==Number(id)))
   } catch (error) {
    alert("Ошибка при удалении  из корзины")
   }
  } 

  const onAddToFavorite = async(obj) =>{
    try{
      if(favorites.find(favObj =>favObj.id===obj.id)){
        axios.delete(`https://615aee6b4a360f0017a8135c.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !==Number(obj.id)))
      }else{
        const {data} = await axios.post('https://615aee6b4a360f0017a8135c.mockapi.io/favorites',obj)
        setFavorites(prev => [...prev,data])
      }
    }catch(error){
      alert('Не удалось добавить в фавориты')
    }
   
  }
   
  const onChangeSearchInpute = (event) =>{
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) =>{
    return cartItems.some((obj) => Number(obj.parentId) ===Number(id))
  }

  return (
    <AppContext.Provider value={{items,cartItems,favorites,isItemAdded,onAddToFavorite,setCartOpened,setCartItems,onAddToCart}}>
    <div className="wrapper clear">
      <Drawer 
      items={cartItems} 
      onClose={()=>setCartOpened(false)} 
      onRemove={onRemoveItem}
      opened = {cartOpened} 
      /> 
      <Header onClickCart={()=> setCartOpened(true)} />
       <Route path="/" exact>
        <Home
         items={items}
         cartItems={cartItems}
         searchValue={searchValue}
         setSearchValue={setSearchValue}
         onAddToFavorite={onAddToFavorite}
         onAddToCart={onAddToCart}
         onChangeSearchInpute={onChangeSearchInpute}
         isLoading={isLoading}

         
        />
       </Route>
       <Route path="/#/favorites" exact>
         <Favorites  />
       </Route>
       <Route path="/#/orders" exact>
         <Orders/>
       </Route>
      </div>
      </AppContext.Provider>
  )
}

export default App;
