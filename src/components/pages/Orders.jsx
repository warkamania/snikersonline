import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context'
import Card from "../Card/index"
const Orders = () => {
  const { onAddToFavorit} = useContext(AppContext)
  const [orders, setOrdders] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() =>{
   (async ()=>{
    try {
      const {data} = await axios.get('https://615aee6b4a360f0017a8135c.mockapi.io/orders')
      setOrdders(data.reduce((prev,obj)=>[...prev,...obj.items],[]))
      setIsLoading(false)
    } catch (error) {
      alert("Ошибка при запросе заказов") 
    }
   })()
  },[])
    return (
        <div className='content p-40'>
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои Заказы</h1>
        </div>
         <div className="d-flex flex-wrap">
         {(isLoading ? [...Array(8)]: orders).map((item,index)=>(
           <Card
           key={index}
           onFavorite={(obj) => onAddToFavorit(obj)}
           loading={isLoading}
           {...item}
           
           />
         ))}
         
           
        </div>
      </div>
    )
}

export default Orders
