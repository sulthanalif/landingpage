import React, { useEffect, useState } from "react";
import Navbar from "./Partials/Navbar";
import Footer from "./Partials/Footer";

const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        const debounce = (func, delay) => {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        };

        const debouncedHandleScroll = debounce(handleScroll, 100);

        window.addEventListener("scroll", debouncedHandleScroll);

        return () =>
            window.removeEventListener("scroll", debouncedHandleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Scroll dengan animasi halus
        });
    };

    return (
        <>
            {/* Spinner Start */}
            {isLoading && (
                <div
                    id="spinner"
                    className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
                >
                    <div
                        className="spinner-border text-primary"
                        style={{ width: "3rem", height: "3rem" }}
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {/* Spinner End */}

            <Navbar />

            <div className="">{children}</div>

            <Footer />

            {/* Back to Top */}
            {showBackToTop && (
                <a
                    href="#"
                    className="btn btn-lg btn-primary btn-lg-square back-to-top"
                    onClick={scrollToTop} // Tambahkan event onClick
                    style={{ display: showBackToTop ? "block" : "none" }} // Tampilkan/sembunyikan tombol
                >
                    <i className="bi bi-arrow-up" />
                </a>
            )}
        </>
    );
};

export default Layout;
