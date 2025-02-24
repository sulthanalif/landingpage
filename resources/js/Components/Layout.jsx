import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";

const Layout = ({ children }) => {
    return (
        <div className="super_container">
            <Header />

            <div className="">{children}</div>

            <Footer />
        </div>
    );
};

export default Layout;
