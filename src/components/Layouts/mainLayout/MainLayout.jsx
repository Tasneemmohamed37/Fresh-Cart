import React from "react";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <div className="container pt-20 pb-5 min-h-96">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
