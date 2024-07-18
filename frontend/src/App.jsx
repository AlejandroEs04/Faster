import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider';
import { ShopProvider } from './context/ShopProvider';
import AdminLayout from './layout/AdminLayout'
import MainLayout from './layout/MainLayout'
import RutaProtegida from './layout/RutaProtegida'
import Index from './pages/Index'
import Admin from './pages/Admin'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ConfirmAccount from './pages/ConfirmAccount'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Cart from './pages/Cart'
import Porfile from './pages/Porfile'
import BuySeccion from './pages/BuySeccion'
import Products from './pages/Products'
import Orders from './pages/Orders'
import UserData from './pages/UserData'
import Address from './pages/Address'
import Product from './pages/Product'
import AdminBuy from './pages/AdminBuy'
import AdminArticles from './pages/AdminArticles'
import MoreAbout from './pages/MoreAbout'
import Buy from './pages/Buy'
import AdminTypes from './pages/AdminTypes';
import ClientSupport from './pages/ClientSupport';
import AdminProducts from './pages/AdminProducts';
import CrudProduct from './pages/CrudProduct';

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path='products' element={<Products />} />
              <Route path='products/:id' element={<Product />} />
              <Route path='moreAbout/:id' element={<MoreAbout />} />
              <Route path='support' element={<ClientSupport />} />
            </Route>

            <Route path='/buy' element={<RutaProtegida />}>
              <Route index element={<BuySeccion />} />
              <Route path=':id' element={<Buy />} />
            </Route>

            <Route path='/user' element={<RutaProtegida />}>
              <Route path='cart' element={<Cart />} />
              <Route path='porfile' element={<Porfile />} />
              <Route path='porfile/orders' element={<Orders />} />
              <Route path='porfile/data' element={<UserData />} />
              <Route path='porfile/address' element={<Address />} />
            </Route>

            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='products/create' element={<CrudProduct />} />
              <Route path='products/edit/:id' element={<CrudProduct />} />
              <Route path='buy' element={<AdminBuy />} />
              <Route path='articles' element={<AdminArticles />} />
              <Route path='types' element={<AdminTypes />} />
            </Route>

            <Route path='/login' element={<MainLayout />}>
              <Route index element={<Login />} />
            </Route>

            <Route path='/new-account' element={<MainLayout />}>
              <Route index element={<SignUp />} />
            </Route>

            <Route path='/confirm-account/:token' element={<MainLayout />}>
              <Route index element={<ConfirmAccount />} />
            </Route>

            <Route path='/forget-password' element={<MainLayout />}>
              <Route index element={<ForgetPassword />} />
            </Route>

            <Route path='/reset-password/:token' element={<MainLayout />}>
              <Route index element={<ResetPassword />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ShopProvider>
    </BrowserRouter>
  )
} 

export default App