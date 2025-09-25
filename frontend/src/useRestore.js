import { useRecoilState } from "recoil";
import { authState } from "./store/atoms/authAtom";
import { useEffect } from "react";
import axios from "axios";






function useRestoreAuth(){
   const [auth , setAuth] = useRecoilState(authState)

   useEffect(() => {
      const checkauth = async ()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/validate`, {withCredentials:true})
            console.log(response);
            
            setAuth({
                isLoggedIn:true,
                user:response.data.data
            })
        } catch {
             setAuth({
          isLoggedIn: true,
          user: res.data.data
        })
        }
      }
      checkauth()
   }, [])
   
}


export default useRestoreAuth