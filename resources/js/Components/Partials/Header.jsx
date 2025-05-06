import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Navbar from "./Navbar";

const Header = () => {
    const { url, component } = usePage();
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
                                                <a
                                                    href="tel:08118880678"
                                                    className="text-light ml-2"
                                                    target="_blank"
                                                >
                                                    0811-8880-678
                                                </a>
                                            </li>
                                            <li>
                                                <i
                                                    className="fa fa-envelope-o"
                                                    aria-hidden="true"
                                                />
                                                <a
                                                    href="mailto:marketing@lscs.sch.id"
                                                    className="text-light ml-2"
                                                    target="_blank"
                                                >
                                                    marketing@lscs.sch.id
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="top_bar_login ml-auto">
                                            <div className="login_button">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <Link
                                                        href="#"
                                                        className="d-flex align-items-center ml-2 mr-4"
                                                    >
                                                        <img
                                                            src="/img/en.svg"
                                                            className="img-fluid mr-1"
                                                            style={{
                                                                maxWidth:
                                                                    "auto",
                                                                maxHeight:
                                                                    "25px",
                                                            }}
                                                            alt="EN"
                                                        />
                                                        EN
                                                    </Link>
                                                </div>
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
                                            <img
                                                src="/img/logo.png"
                                                className="img-fluid"
                                                style={{
                                                    maxWidth: "70px",
                                                    maxHeight: "auto",
                                                }}
                                                alt="logo"
                                            />
                                            {/* <div className="logo_text">
                                                Sch<span>ool</span>
                                            </div> */}
                                        </Link>
                                    </div>
                                    <nav className="main_nav_contaner ml-auto">
                                        <ul className="main_nav">
                                            <li
                                                className={
                                                    url === "/" ? "active" : ""
                                                }
                                            >
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li
                                                className={
                                                    url === "/about" ||
                                                    url === "/story" ||
                                                    url === "/teacher"
                                                        ? "nav-item dropdown active"
                                                        : "nav-item dropdown"
                                                }
                                            >
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
                                                        className={
                                                            url === "/about"
                                                                ? "dropdown-item active"
                                                                : "dropdown-item text-dark"
                                                        }
                                                        href="/about"
                                                    >
                                                        About Us
                                                    </Link>
                                                    <Link
                                                        className={
                                                            url === "/story"
                                                                ? "dropdown-item active"
                                                                : "dropdown-item text-dark"
                                                        }
                                                        href="/story"
                                                    >
                                                        Our Stories
                                                    </Link>
                                                    <Link
                                                        className={
                                                            url === "/teacher"
                                                                ? "dropdown-item active"
                                                                : "dropdown-item text-dark"
                                                        }
                                                        href="/teacher"
                                                    >
                                                        Teacher
                                                    </Link>
                                                </div>
                                            </li>
                                            <li
                                                className={
                                                    url === "/admission"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                <Link href="/admission">
                                                    Admission
                                                </Link>
                                            </li>
                                            <li
                                                className={
                                                    url === "/curriculum" ||
                                                    url ===
                                                        "/calendar-academic" ||
                                                    url === "/accreditation" ||
                                                    url === "/extracurricular"
                                                        ? "nav-item dropdown active"
                                                        : "nav-item dropdown"
                                                }
                                            >
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
                                                        className={
                                                            url ===
                                                            "/curriculum"
                                                                ? "dropdown-item active"
                                                                : "dropdown-item text-dark"
                                                        }
                                                        href="/curriculum"
                                                    >
                                                        Explanation
                                                    </Link>
                                                    <Link
                                                        className={
                                                            url ===
                                                            "/calendar-academic"
                                                                ? "dropdown-item active"
                                                                : "dropdown-item text-dark"
                                                        }
                                                        href="/calendar-academic"
                                                    >
                                                        Academic Calendar
                                                    </Link>
                                                    <Link
                                                        className={
                                                            url ===
                                                            "/extracurricular"
                                                                ? "dropdown-item active"
                                                                : "dropdown-item text-dark"
                                                        }
                                                        href="/extracurricular"
                                                    >
                                                        Extracurricular
                                                    </Link>
                                                    <Link
                                                        className={
                                                            url ===
                                                            "/accreditation"
                                                                ? "dropdown-item active"
                                                                : "dropdown-item text-dark"
                                                        }
                                                        href="/accreditation"
                                                    >
                                                        Accreditation
                                                    </Link>
                                                </div>
                                            </li>
                                            <li
                                                className={
                                                    url === "/contact"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                <Link href="/contact">
                                                    Contact
                                                </Link>
                                            </li>
                                            <li
                                                className={
                                                    url === "/register"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                <Link href="/register">
                                                    Register
                                                </Link>
                                            </li>
                                        </ul>
                                        {/* Hamburger */}
                                        <div
                                            className="hamburger menu_mm"
                                            onClick={toggleNavbar}
                                        >
                                            <i
                                                className="fa fa-bars menu_mm"
                                                aria-hidden="true"
                                            />
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
