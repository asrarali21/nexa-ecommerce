import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { LoadingStateApi } from './store/atoms/Loading.state'
import GlobalSpinner from './components/GlobalSpinner'


function AppWrapper(params) {
  
   const loading = useRecoilValue(LoadingStateApi)

  return (
    <>
    {loading && <GlobalSpinner/>}
       <BrowserRouter>
  <ToastContainer/>
    <App />
  </BrowserRouter>
    </>
  )
} 

createRoot(document.getElementById('root')).render(
<RecoilRoot>
  <AppWrapper/>
  </RecoilRoot>
)
