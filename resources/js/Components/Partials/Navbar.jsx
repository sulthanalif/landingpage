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
                    <ul className="menu_mm">
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
                                <Link className="dropdown-item" href="#">
                                    Teacher Profile
                                </Link>
                            </div>
                        </li>
                        <li className="menu_mm">
                            <Link href="/admission">Admission</Link>
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
                        <li className="menu_mm">
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li className="menu_mm">
                            <Link href="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
