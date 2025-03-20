import { Link } from "@inertiajs/react";
import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div
                    className="footer_background"
                    style={{
                        backgroundImage: "url(/landing/images/footer_bg.jpg)",
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
                                                <Link
                                                    href="/"
                                                    className="d-flex align-items-center"
                                                >
                                                    <img
                                                        src="/img/logo.png"
                                                        className="img-fluid"
                                                        style={{
                                                            maxWidth: "70px",
                                                            maxHeight: "auto",
                                                        }}
                                                        alt="logo"
                                                    />
                                                    <div className="footer_logo_text">
                                                        LS<span>CS</span>
                                                    </div>
                                                </Link>
                                            </div>
                                            {/* <div className="footer_about_text">
                                                <p>
                                                    Jalan Taman Surya 5 Blok EE2
                                                    No.20-27, RT.2/RW.3,
                                                    Pegadungan, Kec. Kalideres,
                                                    Kota Jakarta Barat, Daerah
                                                    Khusus Ibukota Jakarta 11830
                                                </p>
                                            </div> */}
                                            <div className="footer_social">
                                                <ul>
                                                    <li>
                                                        <a href="https://www.facebook.com/pages/category/Community/Lia-Stephanie-School-115071265257740/" target="_blank">
                                                            <i
                                                                className="fa fa-facebook"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="https://www.instagram.com/liastephanieschool/" target="_blank">
                                                            <i
                                                                className="fa fa-instagram"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="https://wa.me/+6281310602139" target="_blank">
                                                            <i
                                                                className="fa fa-whatsapp"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="https://lsgs.quintal.id/" target="_blank">
                                                            <i
                                                                className="fa fa-leanpub"
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
                                                        <Link href="#">
                                                            Values
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            Activities
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            Admission
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            Contact
                                                        </Link>
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
                                                        info@lscs.sch.id
                                                    </li>
                                                    <li>
                                                        Tel: (021) 54390347
                                                    </li>
                                                    <li>
                                                        Jalan Taman Surya 5 Blok
                                                        EE2 No.20-27, RT.2/RW.3,
                                                        Pegadungan, Kec.
                                                        Kalideres, Kota Jakarta
                                                        Barat, Daerah Khusus
                                                        Ibukota Jakarta 11830
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
