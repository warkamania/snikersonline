import React from 'react'

import Card from "../Card/index";

const Home = ({items,
    searchValue,
    cartItems,
    setSearchValue,
    onAddToFavorite,
    onAddToCart,
    onChangeSearchInpute,
    isLoading 
}) => {
 
    
const renderItems = () =>{
    const filtredItems = items.filter((item)=>item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(10)]: filtredItems).map((item,index)=>(   
        <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj)=>onAddToCart(obj)}
        loading={isLoading}
        {...item}
        />
      ))
}    
    return (
        <div className='content p-40'>
        <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`: 'Все кросcовки'}</h1>
         <div className="search-block d-flex">
           <img src="img/search.svg" alt="Search"/>
           {searchValue && <img onClick={() => setSearchValue('')} className=" clear cu-p" src="img/btn-remove.svg" alt="Close"/>}
           <input onChange={onChangeSearchInpute} value={searchValue} placeholder="Поиск..." />

         </div>
        </div>
         <div className="d-flex flex-wrap">
          {renderItems()}
         
           
        </div>
      </div>
    )
}

export default Home
