import React, { useEffect, useState } from 'react'
import { ShoppingCart, Search, User, Heart, ChevronDown, X } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authState } from '../store/atoms/authAtom'
import axios from 'axios'
import { handleError, handlesuccess } from '../toast.util'
import { productstate } from '@/store/atoms/ProductState'

function Navbar() {
    const [auth, setAuth] = useRecoilState(authState)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const allproducts = useRecoilValue(productstate)
    const navigate = useNavigate()

    

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([])
            return
        }

        const filteredproduct = allproducts.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(filteredproduct.slice(0, 8))
    }, [searchQuery, allproducts])

    const handleSearchSelect = (item) => {
        navigate(`/singleProd/${item._id}`)
        setShowSearch(false)
        setSearchQuery('')
        setSearchResults([])
    }

    function handleclick() {
        navigate("/login")
        setShowDropdown(false)
    }

    async function handlelogout() {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/users/logoutUser",
                {},
                { withCredentials: true }
            )
            handlesuccess(response.data.message)
            setAuth({ isLoggedIn: false, user: null })
            navigate("/login")
        } catch (error) {
            handleError(error.response?.data?.message || "Logout failed")
        }
    }

    return (
        <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 pl-4">
                        <Link to="/" className="text-2xl font-serif font-bold text-stone-900">
                            nexa
                        </Link>
                    </div>

                    {/* Navigation Links - Centered OR Search Input */}
                    <div className="hidden md:block flex-1">
                        {showSearch ? (
                            <div className="relative">
                                {/* Search Input Field */}
                                <div className="flex items-center justify-center">
                                    <div className="relative w-96">
                                        <input
                                            type="text"
                                            placeholder="Search products, categories..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full px-4 py-2 pl-10 pr-10 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
                                            autoFocus
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                                        <button
                                            onClick={() => {
                                                setShowSearch(false)
                                                setSearchQuery('')
                                                setSearchResults([])
                                            }}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            <X className="h-4 w-4 text-stone-400 hover:text-stone-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Search Results Dropdown - Positioned absolutely */}
                                {searchResults.length > 0  &&(
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-96 bg-white border border-stone-200 rounded-lg shadow-lg z-[60] mt-2">
                                        <div className="max-h-64 overflow-y-auto">
                                            {searchResults.map((item) => (
                                        
                                                <div
                                                    key={item._id}
                                                    onClick={() => handleSearchSelect(item)}
                                                    className="flex items-center p-3 hover:bg-stone-50 cursor-pointer border-b border-stone-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                                                >
                                                    <img
                                                        src={item.image[0]}
                                                        alt={item.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                    <div className="ml-3 flex-1">
                                                        <div className="text-sm font-medium text-stone-900">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-xs text-stone-500">
                                                            {item.category}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-semibold text-stone-900">
                                                        ₹{item.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Normal Navigation Links
                            <div className="flex items-center justify-center space-x-8">
                                <Link to="/" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium transition-colors">
                                    Home
                                </Link>
                                <Link to="/electronics" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium transition-colors">
                                    Electronics
                                </Link>
                                <Link to="/fashion" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium transition-colors">
                                    Fashion
                                </Link>
                                <Link to="/sports" className="text-stone-700 hover:text-stone-900 px-3 py-2 text-sm font-medium transition-colors">
                                    Sports
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4 pr-4">
                        <Search 
                            className="h-5 w-5 text-stone-600 hover:text-stone-900 cursor-pointer transition-colors" 
                            onClick={() => setShowSearch(!showSearch)}
                        />
                        
                        {/* User Dropdown */}
                        {auth.isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium bg-stone-50 px-3 py-2 rounded-lg"
                                >
                                    <User className="h-4 w-4 cursor-pointer" />
                                    <div className="text-left cursor-pointer">
                                        <div className="font-medium text-stone-900">
                                            {auth.user?.name || 'User'}
                                        </div>
                                        <div className="text-xs text-stone-500">
                                            {auth.user?.email}
                                        </div>
                                    </div>
                                    <ChevronDown className="h-4 w-4 cursor-pointer" />
                                </button>
                                
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-stone-200 z-50">
                                        {/* User Info Header */}
                                        <div className="px-4 py-3 border-b border-stone-200">
                                            <div className="font-medium text-stone-900">
                                                {auth.user?.name}
                                            </div>
                                            <div className="text-sm text-stone-500">
                                                {auth.user?.email}
                                            </div>
                                        </div>
                                        
                                        {/* Menu Options */}
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    navigate('/profile')
                                                    setShowDropdown(false)
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                            >
                                                View Profile
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/orders')
                                                    setShowDropdown(false)
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                            >
                                                My Orders
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/wishlist')
                                                    setShowDropdown(false)
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                            >
                                                Wishlist
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/settings')
                                                    setShowDropdown(false)
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                                            >
                                                Account Settings
                                            </button>
                                            <hr className="my-1" />
                                            <button
                                                onClick={handlelogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleclick}
                                className="flex items-center space-x-1 text-stone-600 hover:text-stone-900 cursor-pointer transition-colors bg-stone-50 px-3 py-2 rounded-lg"
                            >
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">Login</span>
                            </button>
                        )}

                        <Heart className="h-5 w-5 text-stone-600 hover:text-stone-900 cursor-pointer transition-colors" />
                        <div className="relative">
                            <ShoppingCart onClick={()=>navigate("cart")} className="h-5 w-5 text-stone-600 hover:text-stone-900 cursor-pointer transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                2
                            </span>
                        </div>
                    </div>
                </div>

                {/* Click outside to close dropdowns */}
                {(showDropdown || showSearch) && (
                    <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => {
                            setShowDropdown(false)
                            setShowSearch(false)
                            setSearchResults([])
                        }}
                    ></div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
