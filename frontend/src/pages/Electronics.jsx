import { productstate } from '@/store/atoms/ProductState'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Card, CardContent } from '@/components/ui/card'
import axios  from 'axios'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function Electronics() {
    const navigate = useNavigate()
     
   const allproducts  = useRecoilValue(productstate)
   const electronicsproduct = allproducts.filter(item => item.category.toLowerCase() === "electronics")
   console.log(electronicsproduct);
   
   
  return (
       <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {electronicsproduct.map((item) => (
                    <Card 
                    onClick ={()=>navigate(`/singleProd/${item._id}`)}
                        key={item._id} 
                        className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white max-w-sm"
                    >
                        <CardContent className="p-0">
                            {/* Reuse the same card layout from Products.jsx */}
                            <div className="aspect-square bg-stone-100 relative overflow-hidden">
                                <img
                                    src={item.image[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Heart className="h-4 w-4 text-stone-600 hover:text-red-500 cursor-pointer" />
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-stone-900 mb-1 text-sm">{item.name}</h3>
                                <p className="text-stone-600 text-xs mb-3 line-clamp-2">{item.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-stone-900">₹{item.price}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
  )
}

export default Electronics
