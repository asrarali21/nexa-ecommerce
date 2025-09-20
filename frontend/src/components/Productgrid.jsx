import React from 'react'
import { Card, CardContent } from "./ui/card"
import { Heart } from "lucide-react"
import { Button } from './ui/button'
import { useRecoilValue } from 'recoil'
import { productstate } from '@/store/atoms/ProductState'
import { useNavigate } from 'react-router-dom'
function Productgrid() {
  const navigate = useNavigate()
     
    const allproducts = useRecoilValue(productstate)
    console.log(allproducts);
    
    const featuredProducts = allproducts.filter(item=>item.bestSeller == true)
     
  return (
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light text-stone-900 mb-4">Featured Products</h2>
            <p className="text-stone-600 text-lg">Handpicked selections from our premium collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((item)=>(
                <Card onClick ={()=>navigate(`/singleProd/${item._id}`)} className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white" >
              <CardContent  className="p-0">
                <div className="aspect-square bg-stone-100 relative overflow-hidden">
                  <img
                    src={item.image[0]}
                    alt="Premium Headphones"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="h-5 w-5 text-stone-600 hover:text-red-500 cursor-pointer" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-stone-900 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-stone-900">₹{item.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            ))}
          

          </div>
        </div>
      </section>
  )
}

export default Productgrid
