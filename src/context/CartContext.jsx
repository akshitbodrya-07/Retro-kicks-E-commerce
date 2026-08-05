import { createContext, useReducer, useContext } from "react"

const CartContext = createContext()

const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEM':{
            const exists = state.find(item => item.id === action.payload.id)

            if(exists){
                return state.map(item =>
                    item.id === action.payload.id ?
                    {...item, quantity: item.quantity + 1} : item 
                )
            }
            return [...state, {...action.payload, quantity: 1}]
        }

        case 'REMOVE_ITEM':{
            return state.filter(item => item.id !== action.payload.id)
        }

        case 'UPDATE_QTY':{
            return state.map(item =>
                item.id === action.payload.id ?
                {...item, quantity: action.payload.quantity} : item
            )
        }

        case 'CLEAR_CART':{
            return []
        }

        default:
            return state
    }
}

export const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(cartReducer, [])

    return(
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}