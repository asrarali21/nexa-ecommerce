// Create: /src/pages/SingleProduct.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { singleProductState } from '@/store/atoms/ProductState'
import { Button } from '@/components/ui/button'
import { Heart, Star, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { handlesuccess } from '@/toast.util'
import { LoadingStateApi } from '@/store/atoms/Loading.state'

function SingleProduct() {
    const { id } = useParams() // Get product ID from URL
    const product = useRecoilValue(singleProductState(id)) // Pass ID to selector
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    console.log(quantity);

    const setLoading = useSetRecoilState(LoadingStateApi)
    
    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-stone-900 mx-auto mb-4"></div>
                    <p className="text-stone-600">Loading product...</p>
                </div>
            </div>
        )
    }



    const HandleClick = async()=>{
      try {
        setLoading(true)
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/cart/add` , {productId:id , quantity} , {withCredentials:true})
          handlesuccess("product added successfully")
          console.log(response);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
        
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden">
                        <img
                            src={product.image[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {product.image.length > 1 && (
                        <div className="flex space-x-2 overflow-x-auto">
                            {product.image.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                                        selectedImage === index ? 'border-stone-900' : 'border-stone-200'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-stone-900 mb-2">{product.name}</h1>
                        <p className="text-stone-600 mb-4">{product.description}</p>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-stone-600 text-sm">(4.5) 123 reviews</span>
                        </div>
                        <div className="text-3xl font-bold text-stone-900 mb-6">₹{product.price}</div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Quantity</label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 border border-stone-300 rounded-md hover:bg-stone-50"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 border border-stone-300 rounded-md min-w-[60px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 border border-stone-300 rounded-md hover:bg-stone-50"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <Button onClick={HandleClick} className="flex-1 bg-stone-900 hover:bg-stone-800 cursor-pointer">
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="border-t border-stone-200 pt-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-stone-600">Category:</span>
                                <span className="font-medium">{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-600">Brand:</span>
                                <span className="font-medium">{product.brand || 'Generic'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-600">Stock:</span>
                                <span className="font-medium text-green-600">In Stock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct