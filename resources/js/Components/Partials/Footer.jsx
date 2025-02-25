import { Link } from "@inertiajs/react";
import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div
                    className="footer_background"
                    style={{
                        backgroundImage: "url(/landing/images/footer_background.png)",
                    }}
                />
                <div className="container">
                    <div className="row footer_row">
                        <div className="col">
                            <div className="footer_content">
                                <div className="row">
                                    <div className="col-lg-3 footer_col">
                                        {/* Footer About */}
                                        <div className="footer_section footer_about">
                                            <div className="footer_logo_container">
                                                <a href="#">
                                                    <div className="footer_logo_text">
                                                        Sch<span>ool</span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="footer_about_text">
                                                <p>
                                                    Lorem ipsum dolor sit
                                                    ametium, consectetur
                                                    adipiscing elit.
                                                </p>
                                            </div>
                                            <div className="footer_social">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <i
                                                                className="fa fa-facebook"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i
                                                                className="fa fa-google-plus"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i
                                                                className="fa fa-instagram"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i
                                                                className="fa fa-twitter"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 footer_col">
                                        {/* Footer links */}
                                        <div className="footer_section footer_links">
                                            <div className="footer_title">
                                                Menu
                                            </div>
                                            <div className="footer_links_container">
                                                <ul>
                                                    <li>
                                                        <Link href="/">
                                                            Home
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            About
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            News
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">Values</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            Activities
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">Admission</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">FAQs</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">Contact</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 footer_col">
                                        {/* Footer Contact */}
                                        <div className="footer_section footer_contact">
                                            <div className="footer_title">
                                                Contact Us
                                            </div>
                                            <div className="footer_contact_info">
                                                <ul>
                                                    <li>
                                                        Email:
                                                        Info.deercreative@gmail.com
                                                    </li>
                                                    <li>
                                                        Phone: +(88) 111 555 666
                                                    </li>
                                                    <li>
                                                        40 Baria Sreet 133/2 New
                                                        York City, United States
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row copyright_row">
                        <div className="col">
                            <div className="copyright d-flex flex-lg-row flex-column align-items-center justify-content-start">
                                <div className="cr_text">
                                    Copyright © All rights reserved.
                                </div>
                                <div className="ml-lg-auto cr_links">
                                    <ul className="cr_list">
                                        <li>
                                            <a href="#">Terms of Use</a>
                                        </li>
                                        <li>
                                            <a href="#">Privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
