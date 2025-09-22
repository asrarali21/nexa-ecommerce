import axios from 'axios'
import { Trash2 } from 'lucide-react'

import React, { useEffect, useState } from 'react'

function Cart() {
  // Initialize with a safe shape
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 })
  console.log(cart);
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/cart/getcart`,
          { withCredentials: true }
        )

        const payload = res.data?.data || { items: [] }
        const itemsRaw = payload.items ?? []

        const items = itemsRaw.map(i => ({
          itemId: i._id,
          productId: i.product?._id,
          name: i.product?.name,
          price: i.product?.price ?? 0,
          image: i.product?.image?.[0],
          quantity: i.quantity ?? 1
        }))
     
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
        const totalPrice = items.reduce((acc, item) => acc + item.quantity * (item.price || 0), 0)

        setCart({ items, totalItems, totalPrice })
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load cart')
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [])

  // Move handleDelete inside Cart component and fix async usage
  const handleDelete = async (productId) => {
    console.log(productId);
    
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/${productId}`,
        { withCredentials: true }
      );
     setCart(prevCart => {
        const updatedItems = prevCart.items.filter(item=>item.productId !== productId)  
        const totalItems = updatedItems.reduce((acc, item) => acc + item.quantity, 0)
      const totalPrice = updatedItems.reduce((acc, item) => acc + item.quantity * item.price, 0)

      return {
            items: updatedItems,
        totalItems,
        totalPrice
      }
     })
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to remove item');
    }
  };

  if (loading) return <div>Loading…</div>
  if (error) return <div>{error}</div>

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.productId} className="flex items-center gap-3 py-2 border-b">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
              <div className="flex-1">
                <div className="text-sm">{item.name}</div>
                <div className="text-xs text-stone-500">Qty: {item.quantity}</div>
              </div>
              <div className="text-sm">₹{item.price * item.quantity}</div>
                 <button
                aria-label="Remove item"
                onClick={() => handleDelete(item.productId)}
                className="p-1 hover:text-red-600"
              >
                <Trash2  className='cursor-pointer'/>
              </button>
            </div>
          ))}

          <div className="mt-4">
            <div>Total items: {cart.totalItems}</div>
            <div>Total price: ₹{cart.totalPrice}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
