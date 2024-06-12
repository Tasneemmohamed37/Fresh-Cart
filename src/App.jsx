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
import CheckOut from "./pages/order/checkOut/CheckOut";
import Products from "./pages/products/Products";
import CartProvider from "./context/Cart.Context";
import Categories from "./pages/categories/Categories";
import AllOrders from "./pages/order/allOrders/AllOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Brands from "./pages/brands/Brands";

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
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "checkout", element: <CheckOut /> },
        { path: "allOrders", element: <AllOrders /> },
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

  const myClient = new QueryClient();


  return (
    <>
      <QueryClientProvider  client={myClient}>
        <UserProvider>
          <CartProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools></ReactQueryDevtools>
            <Toaster />
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;
