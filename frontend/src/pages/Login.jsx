import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { handleError, handlesuccess } from '../toast.util'
import { useSetRecoilState } from 'recoil'
import { authState } from '../store/atoms/authAtom';
import { LoadingStateApi } from '@/store/atoms/Loading.state'

function Login() {
    const navigate = useNavigate()

    const Setloading = useSetRecoilState(LoadingStateApi)

    function handleregisterclick() {
        navigate("/register")
    }

  const [logininfo, setLogininfo] = useState({
  email: "",
  password: ""
});
console.log(logininfo);

const setAuth = useSetRecoilState(authState)
  
   async function handleformsubmit(e) {
      e.preventDefault();
      const { email  , password} =logininfo
   if (!email || !password) {
  return handleError("all fields are required")
    }
    try {
        Setloading(true)
     const response =  await  axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/loginUser` , logininfo ,{
   withCredentials: true
    })
    console.log(response.data.data);
    handlesuccess(response.data.message)
    setAuth({
        isLoggedIn:true,
        userdata:response.data.data
    })
  
    
     setTimeout(()=>{
      setLogininfo({  email: "", password: "" });
       navigate("/")
    }, 1500)
 
    } catch (error) {
    handleError(error.response.data.message)
    console.log(error);
    
     }finally{
        Setloading(false)
     }
   }

  return (
    <div>

        <div className="flex h-[700px] w-full">
    <div className="w-full flex flex-col items-center justify-center">

        <form className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleformsubmit}>
            <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
            <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>

        

            <div className="flex items-center gap-4 w-full my-5">
                <div className="w-full h-px bg-gray-300/90"></div>
                <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                </svg>
                <input type="email" name='email' placeholder="Email id" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" value={logininfo.email} onChange={(e)=>setLogininfo({...logininfo,[e.target.name]:e.target.value})}/>                
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                </svg>
                <input type="password" name='password' placeholder="Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" value={logininfo.password} onChange={(e)=>setLogininfo({...logininfo,[e.target.name]:e.target.value})} />
            </div>

            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                <div className="flex items-center gap-2">
                    <input className="h-5" type="checkbox" id="checkbox"/>
                    <label className="text-sm" for="checkbox">Remember me</label>
                </div>
                <a className="text-sm underline" href="#">Forgot password?</a>
            </div>

            <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer">
                Login
            </button>
            <p className="text-gray-500/90 text-sm mt-4" onClick={handleregisterclick}>Don’t have an account? <a className="text-indigo-400 hover:underline" href="">Sign up</a></p>
        </form>
    </div>
</div>
    </div>
  )
}

export default Login
