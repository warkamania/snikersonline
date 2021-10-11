import React, { useContext } from 'react'
import AppContext from '../Context'

const Info = ({title,image,description}) => {
    const{setCartOpened} = useContext(AppContext)
    return (
        <div className="cartEmpty d-flex align-center justyfy-center flex-column flex">
            <img class="mb-20" width="120px" height="120px" src={image} alt="EmptyCart"/>
            <h2>{title}</h2>
            <p class="opacity-6">{description}</p>
            <button  onClick={()=>setCartOpened(false)} class="greenButton">
              <img src="/img/arrow.svg" alt="Arrow"/>
                Вернуться назад
            </button>
          </div>
    )
} 

export default Info
