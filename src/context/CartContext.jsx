import { createContext, useReducer, useContext } from "react"

const CartContext = createContext()

const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEM':{
            // Two lines are the "same" cart item only if both the shoe AND the
            // size match — otherwise a size 9 and a size 10 of the same shoe
            // would incorrectly collapse into one line with quantity 2.
            const exists = state.find(item =>
                item.id === action.payload.id && item.size === action.payload.size
            )

            if(exists){
                return state.map(item =>
                    (item.id === action.payload.id && item.size === action.payload.size) ?
                    {...item, quantity: item.quantity + 1} : item
                )
            }
            return [...state, {...action.payload, quantity: 1}]
        }

        case 'REMOVE_ITEM':{
            return state.filter(item =>
                !(item.id === action.payload.id && item.size === action.payload.size)
            )
        }

        case 'UPDATE_QTY':{
            return state.map(item =>
                (item.id === action.payload.id && item.size === action.payload.size) ?
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