import { atom, selector, selectorFamily } from "recoil";
import axios from "axios";


export const productstate  = atom({
    key:"productState",
    default:selector({
        key:"productStateDefault",
        get:async()=>{
               try { 
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products/productlist`)
        return res.data?.data ?? []
      } catch (e) {
        console.error('productState fetch failed:', e)
        return []
      }
        }
    })
})

export const singleProductState = selectorFamily({
    key: 'singleProductState',
    get: (productId) => async () => {
        if (!productId) return null
        
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products/singleproduct/${productId}`)
            return res.data?.data ?? null
        } catch (e) {
            console.error('Single product fetch failed:', e)
            return null
        }
    }
})