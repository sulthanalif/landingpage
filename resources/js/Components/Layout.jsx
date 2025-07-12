import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";
import FloatingWhatsApp from "./Partials/FloatingWhatsapp";
import FloatingRegister from "./Pages/FloatingRegister";
import { usePage } from "@inertiajs/react";

const Layout = ({ children }) => {
    const { url } = usePage();
    
    return (
        <div className="super_container">
            <Header />

            <div className="">{children}</div>

            <FloatingWhatsApp />

            {url !== "/register" && <FloatingRegister />}
            <Footer />
        </div>
    );
};

export default Layout;
