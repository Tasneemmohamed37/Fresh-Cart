import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/Layouts/mainLayout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signUp/SignUp";
import NotFound from "./pages/notFound/NotFound"
import { Toaster } from "react-hot-toast";
import AuthGard from "./components/authGard/AuthGard";
import AuthLayout from "./components/Layouts/authLayout/AuthLayout";
import UserProvider from "./context/User.Context";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Products from "./pages/products/Products";
import CartProvider from "./context/Cart.Context";

function App() {

  const routes = createBrowserRouter([
    {
      path: "/", element:
        <AuthGard>
          <MainLayout />
        </AuthGard>,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "*", element: <NotFound /> },
      ]
    },
    {
      path: "auth", element:
        <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signUp", element: <SignUp /> }
      ]
    },
  ]);

  return (
    <>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </CartProvider>
      </UserProvider>
    </>
  )
}

export default App;
