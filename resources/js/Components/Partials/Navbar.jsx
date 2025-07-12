import { Link } from "@inertiajs/react";
import React from "react";

const Navbar = ({ isActive, closeMenu }) => {
    return (
        <>
            <div
                className={`menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400 ${
                    isActive ? "active" : ""
                }`}
            >
                <div className="menu_close_container" onClick={closeMenu}>
                    <div className="menu_close">
                        <div />
                        <div />
                    </div>
                </div>
                <nav className="menu_nav">
                    <ul className="menu_mm notranslate">
                        <li className="menu_mm">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="menu_mm dropdown">
                            <a
                                className="dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                About
                            </a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" href="/about">
                                    About Us
                                </Link>
                                <Link className="dropdown-item" href="/story">
                                    Our Stories
                                </Link>
                                <Link className="dropdown-item" href="/teacher">
                                    Teacher
                                </Link>
                                <Link className="dropdown-item" href="/admission">
                                    Our Guidelines
                                </Link>
                            </div>
                        </li>
                        <li className="menu_mm dropdown">
                            <a
                                className="dropdown-toggle"
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
                                    href="/calendar-academic"
                                >
                                    Academic Calendar
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    href="/extracurricular"
                                >
                                    Extracurricular
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    href="/accreditation"
                                >
                                    Accreditation
                                </Link>
                            </div>
                        </li>
                        <li className="menu_mm">
                            <Link href="/register">Admission</Link>
                        </li>
                        <li className="menu_mm">
                            <Link href="/career">Career</Link>
                        </li>
                        <li className="menu_mm">
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <div className="menu_nav mt-5">
                    <ul className="menu_mm">
                        <li className="notranslate">
                            <i className="fa fa-phone" aria-hidden="true" />
                            <a
                                href="tel:08118880678"
                                className="text-dark ml-2"
                                target="_blank"
                            >
                                0811-8880-678
                            </a>
                        </li>
                        <li className="notranslate">
                            <i
                                className="fa fa-envelope-o"
                                aria-hidden="true"
                            />
                            <a
                                href="mailto:marketing@lscs.sch.id"
                                className="text-dark ml-2"
                                target="_blank"
                            >
                                marketing@lscs.sch.id
                            </a>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-end align-items-center">
                        <button
                            onClick={() => window.changeLanguage("en")}
                            className="d-flex align-items-center ml-2 mr-4 text-dark notranslate"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <img
                                src="/img/en.svg"
                                className="img-fluid mr-1"
                                style={{
                                    maxWidth: "auto",
                                    maxHeight: "25px",
                                }}
                                alt="EN"
                            />
                            EN
                        </button>
                        <span className="notranslate">|</span>
                        <button
                            onClick={() => window.changeLanguage("id")}
                            className="d-flex align-items-center ml-2 mr-4 text-dark notranslate"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <img
                                src="/img/id.svg"
                                className="img-fluid mr-1"
                                style={{
                                    maxWidth: "auto",
                                    maxHeight: "25px",
                                }}
                                alt="EN"
                            />
                            ID
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
