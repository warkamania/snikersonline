import axios from 'axios'
import React, {  useState } from 'react'
import { useCart } from '../../hooks/useCart'
import Info from '../Info'
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve)=>setTimeout(resolve,ms))
const Drawer = ({onClose,onRemove, items = [],opened}) => {
  const {cartItems,setCartItems,totalPrice} = useCart() 
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  

  const onClickOrder = async () => {
    try {
      const {data} = await axios.post('https://615aee6b4a360f0017a8135c.mockapi.io/orders',{items:cartItems})
     
    setOrderId(data.id)
    setIsOrderComplete(true)
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i]
      await axios.delete('https://615aee6b4a360f0017a8135c.mockapi.io/cart/'+item.id)
      await delay(1000)
    setCartItems([])
    
    }
    } catch (error) {
      alert('Не удалось создать заказ :(')
    }
  }
    return (
    <div  className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}> 
        <div 
        style={{display:"flex",flexDirection:"column"}}
       className={styles.drawer}>
         <h2 className="d-flex justify-between mb-30">Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close"/> </h2>
          {
            items.length > 0 ? (
              <div className="d-flex flex-column flex">
                <div className="items">
            {items.map((obj)=>
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <div 
                style={{backgroundImage: `url(${obj.imageUrl})`}}
                className="cartItemImg"
              >
              </div>
              <div className="mr-20">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img onClick={()=>onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
             </div>
            )}
         
        </div>
         <div className="cartTotalBlock">
         <ul>
           <li>
             <span>Итого:</span>
             <div></div>
            <b>{totalPrice} руб.</b>
           </li>
           <li>
             <span>Налог 5%:</span>
             <div></div>
             <b>{totalPrice*0.05} руб.</b>
           </li>
         </ul>
         <button onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /> </button>
          </div>
              </div>
            )
         : (
          <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
          description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавте хотя бы одну пару кросcовок,чтобы сделать заказ"} 
          image={isOrderComplete ?"/img/complete-order.jpg" :"/img/empty-cart.jpg"} />
         
         )} 
         
         
         
         </div>
         </div>
    )
}

export default Drawer
