import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import Navbar from "./Navbar";

const Header = () => {
    const [isNavbarActive, setIsNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarActive(!isNavbarActive);
    };

    const closeNavbar = () => {
        setIsNavbarActive(false);
    };

    return (
        <>
            <header className="header">
                {/* Top Bar */}
                <div className="top_bar">
                    <div className="top_bar_container">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="top_bar_content d-flex flex-row align-items-center justify-content-start">
                                        <ul className="top_bar_contact_list">
                                            <li>
                                                <div className="question">
                                                    Have any questions?
                                                </div>
                                            </li>
                                            <li>
                                                <i
                                                    className="fa fa-phone"
                                                    aria-hidden="true"
                                                />
                                                <div>001-1234-88888</div>
                                            </li>
                                            <li>
                                                <i
                                                    className="fa fa-envelope-o"
                                                    aria-hidden="true"
                                                />
                                                <div>
                                                    info.deercreative@gmail.com
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="top_bar_login ml-auto">
                                            <div className="login_button">
                                                <Link href="#">
                                                    Register here
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Header Content */}
                <div className="header_container">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="header_content d-flex flex-row align-items-center justify-content-start">
                                    <div className="logo_container">
                                        <Link href="/">
                                            <div className="logo_text">
                                                Sch<span>ool</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <nav className="main_nav_contaner ml-auto">
                                        <ul className="main_nav">
                                            <li className="active">
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle"
                                                    href="#"
                                                    role="button"
                                                    data-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    About
                                                </a>
                                                <div className="dropdown-menu">
                                                    <Link
                                                        className="dropdown-item"
                                                        href="/about"
                                                    >
                                                        About Us
                                                    </Link>
                                                    <Link
                                                        className="dropdown-item"
                                                        href="/story"
                                                    >
                                                        Our Stories
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <Link href="/admission">Admission</Link>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link dropdown-toggle"
                                                    href="#"
                                                    role="button"
                                                    data-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Curriculum
                                                </a>
                                                <div className="dropdown-menu">
                                                    <Link
                                                        className="dropdown-item"
                                                        href="/curriculum"
                                                    >
                                                        Explanation
                                                    </Link>
                                                    <Link
                                                        className="dropdown-item"
                                                        href="/apply-admission"
                                                    >
                                                        Apply Admission
                                                    </Link>
                                                    <Link
                                                        className="dropdown-item"
                                                        href="/calendar-academic"
                                                    >
                                                        Academic Calendar
                                                    </Link>
                                                    <Link
                                                        className="dropdown-item"
                                                        href="/accreditation"
                                                    >
                                                        Accreditation
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>
                                                <Link href="#">Contact</Link>
                                            </li>
                                        </ul>
                                        {/* Hamburger */}
                                        <div className="hamburger menu_mm" onClick={toggleNavbar}>
                                            <i className="fa fa-bars menu_mm" aria-hidden="true" />
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Navbar isActive={isNavbarActive} closeMenu={closeNavbar} />
            </header>
        </>
    );
};

export default Header;
