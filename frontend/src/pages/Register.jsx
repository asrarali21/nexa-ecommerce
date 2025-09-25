import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { handleError, handlesuccess } from '../toast.util';
import { useSetRecoilState } from 'recoil';
import { LoadingStateApi } from '@/store/atoms/Loading.state';

function Register() {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: ""
});

const setloading = useSetRecoilState(LoadingStateApi)

console.log(formData);


    const navigate = useNavigate()
   function handleloginclick() {
      navigate("/login")
   }

   async function handleformsubmit(e) {
      e.preventDefault();
      const {name , email  , password} =formData
   if (!name || !email || !password) {
  return handleError("all fields are required")
    }
    try {
      setloading(true)
     const response =  await  axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/registerUser` , formData ,{
   withCredentials: true
    })  
    console.log(response.data.message);
    handlesuccess(response.data.message)
     setTimeout(()=>{
      setFormData({ name: "", email: "", password: "" });
       navigate("/login")
    }, 1500)
 
 
    } catch (error) {
    handleError(error.response.data.message)
    console.log(error.response.data.message);
    
     }finally{
      setloading(false)
     }

   
   }

  return (
    <div> 
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6"  onSubmit={handleformsubmit}>
                    <div>
                      <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                      <input type="text" name="name" id="name" placeholder="enter you name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.name} onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={formData.email}  onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} />
                  </div>
                 
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"    value={formData.password}    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} />
                  </div>
                 
                  <Button  type="submit"  >create an account</Button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400" onClick={handleloginclick}>
                      Already have an account? <a href="" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
              
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Register
