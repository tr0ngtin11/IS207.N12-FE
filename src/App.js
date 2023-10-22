import React, { useLayoutEffect } from "react";
import ReactGA from "react-ga4";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CodeValidation from "./components/Auth/CodeValidation";
import FindYourAccount from "./components/Auth/FindYourAccount";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./components/Profile/Profile";
import Sidebar from "./components/Profile/Sidebar";
import BillDetailadmin from "./components/admin/BillDetailadmin";
import Blog from "./components/admin/Blog";
import BlogDetail from "./components/admin/BlogDetail";
import Blog_admin from "./components/admin/Blog_admin";
import Dashboard from "./components/admin/Dashboard";
import EditBlog from "./components/admin/EditBlog";
import AddPerSon from "./components/admin/FormAdd/AddPerSon";
import AddProduct from "./components/admin/FormAdd/AddProduct";
import AddUser from "./components/admin/FormAdd/AddUser";
import DetailPerSon from "./components/admin/FormAdd/DetailPerSon";
import DetailProduct from "./components/admin/FormAdd/DetailProduct";
import HoaDon from "./components/admin/HoaDon";
import HoaDonDetail from "./components/admin/HoaDonDetail";
import HoaDonPDF from "./components/admin/HoaDonPDF";
import KhuyenMai from "./components/admin/KhuyenMai";
import Orders_admin from "./components/admin/Orders_admin";
import Products_admin from "./components/admin/Products_admin";
import Staffs_admin from "./components/admin/Staffs_admin";
import Users_admin from "./components/admin/Users_admin";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import BillDetail from "./pages/BillDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ListBlog from "./pages/ListBlog";
import ListOrder from "./pages/ListOrder";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Purchase from "./pages/Purchase";
import MainAdmin from "./pages/admin/MainAdmin";
const excludeHeaderFooterPath = [
  "/signin",
  "/signup",
  "/forgotpassword",
  // "/storelocator",
  "/find-account",
  "/code-validation",
  "/reset-password",

  "/admin",
  // "/product-detail",
  // "/cart",
  // "/profile",
];

const getHeader = () => {
  console.log(window.location.pathname);
  if (excludeHeaderFooterPath.includes(window.location.pathname)) return null;
  return <Header />;
};

const getFooter = () => {
  if (excludeHeaderFooterPath.includes(window.location.pathname)) return null;
  return <Footer />;
};

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
function App() {

ReactGA.initialize("G-2PKPRK3E0Q", {debug: true});
// ReactGA.send({ hitType: "pageview", page: "/", title: "Custom Title" });
ReactGA.event({
  category: 'Button',
  action: 'Click',
  label: 'Contact Us'
});


  ReactGA._gaCommandSendPageview('/about/motherfucker')
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/find-account" element={<FindYourAccount />} />
          <Route path="/code-validation" element={<CodeValidation />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/admin/" element={<MainAdmin />}>
            <Route path="" element={<Dashboard />} />
            <Route path="user" element={<Users_admin />} />
            <Route path="profile" element={<Profile />} />
            <Route path="staff/" element={<Staffs_admin />} />
            <Route path="user/add-user" element={<AddUser />} />
            <Route path="staff/add-staff" element={<AddPerSon />} />
            <Route path="staff/detail-staff" element={<DetailPerSon />} />
            <Route path="product" element={<Products_admin />} />
            <Route path="product/add-product" element={<AddProduct />} />
            <Route path="product/detail-product" element={<DetailProduct />} />
            <Route path="order" element={<Orders_admin />} />
            <Route path="order/detail-bill" element={<BillDetailadmin />} />
            <Route path="hoadon" element={<HoaDon />} />
            <Route path="hoadon/hoadon-detail" element={<HoaDonDetail />} />
            <Route path="hoadon/hoadonpdf" element={<HoaDonPDF />} />
            <Route path="blog" element={<Blog_admin />} />

            <Route path="blog/add-blog" element={<Blog />} />
            <Route path="blog/edit-blog" element={<EditBlog />} />
            <Route path="khuyenmai" element={<KhuyenMai />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="blog/blog-detail" element={<BlogDetail />} />
            <Route path="blog" element={<ListBlog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="aboutme" element={<About />} />

            <Route exact path="/" element={<Home />} />
            <Route path="/sanpham" element={<ListOrder />} />
            {/* <Route path="/product-detail" element={<ProductDetail />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/sanpham/:id" element={<ProductDetail />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/profile" element={<Sidebar />} />
            <Route path="/bill/:id" element={<BillDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
