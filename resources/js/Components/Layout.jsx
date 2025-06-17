import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";
import FloatingWhatsApp from "./Partials/FloatingWhatsapp";

const Layout = ({ children }) => {
    return (
        <div className="super_container">
            <Header />

            <div className="">{children}</div>

            <FloatingWhatsApp />
            <Footer />
        </div>
    );
};

export default Layout;
