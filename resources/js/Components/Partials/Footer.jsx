import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
    const footerRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    // State to keep track of the active tab, 'marketing' is active by default
    const [activeTab, setActiveTab] = useState('marketing');

    // Function to handle tab clicks
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        const handleScroll = () => {
            const footer = footerRef.current;
            if (!footer) return;

            const footerHeight = footer.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const bodyHeight = document.body.scrollHeight;

            const nearBottom =
                scrollY + windowHeight >= bodyHeight - footerHeight;

            if (scrollY < 100) {
                setVisible(false); // sticky footer tidak muncul
                setIsAtBottom(false); // static footer tidak muncul
            } else if (nearBottom) {
                setVisible(false); // sticky footer disembunyikan
                setIsAtBottom(true); // tampilkan static footer
            } else {
                setVisible(true); // tampilkan sticky footer
                setIsAtBottom(false); // sembunyikan static footer
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {isAtBottom ? (
                <>
                    <footer ref={footerRef} className="footer footer-static">
                        <div
                            className="footer_background"
                            style={{
                                backgroundImage:
                                    "url(/img/footer_bg_resize.png)",
                            }}
                        />
                        <div className="container">
                            <div className="row footer_row">
                                <div className="col">
                                    <div className="footer_content">
                                        <div className="row">
                                            <div className="col-lg-5 footer_col">
                                                {/* Footer About */}
                                                <div className="footer_section footer_about">
                                                    <div className="footer_logo_container">
                                                        <Link
                                                            href="/"
                                                            className="d-flex align-items-center"
                                                        >
                                                            <img
                                                                src="/img/logo-content.png"
                                                                className="img-fluid footer_logo"
                                                                alt="logo"
                                                            />
                                                            <div className="footer_logo_text">
                                                                LS
                                                                <span>CS</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    {/* <div className="footer_about_text">
                                                        <p className="text-secondary">
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
                                                                <a
                                                                    href="https://www.facebook.com/pages/category/Community/Lia-Stephanie-School-115071265257740/"
                                                                    target="_blank"
                                                                >
                                                                    <i
                                                                        className="fa-brands fa-facebook"
                                                                        aria-hidden="true"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="https://www.instagram.com/liastephanieschool/"
                                                                    target="_blank"
                                                                >
                                                                    <i
                                                                        className="fa-brands fa-instagram"
                                                                        aria-hidden="true"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="https://wa.me/+628118880678"
                                                                    target="_blank"
                                                                >
                                                                    <i
                                                                        className="fa-brands fa-whatsapp"
                                                                        aria-hidden="true"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="https://www.tiktok.com/@lia.stephanie1?_t=ZS-8yUUdR5HfHc&_r=1"
                                                                    target="_blank"
                                                                >
                                                                    <i
                                                                        className="fa-brands fa-tiktok"
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
                                                                <Link href="/about">
                                                                    About
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/news">
                                                                    News
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/teacher">
                                                                    Teacher
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/story">
                                                                    Activities
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/admission">
                                                                    Admission
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/curriculum">
                                                                    Curriculum
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/contact">
                                                                    Contact
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 footer_col">
                                                {/* Footer Contact */}
                                                <div className="footer_section footer_contact">
                                                    <div className="footer_title">
                                                        Contact Us
                                                    </div>
                                                    <div className="footer_contact_info">
                                                        <ul className="footer_nav_links" id="myTab" role="tablist">
                                                            <li> {/* Wrap buttons in <li> for semantically correct ul */}
                                                                <a
                                                                    className={`footer_link ${activeTab === 'marketing' ? 'active' : ''}`}
                                                                    id="marketing-tab"
                                                                    data-toggle="tab" // Keep for Bootstrap CSS, but logic is handled by React
                                                                    data-target="#marketing"
                                                                    type="button"
                                                                    role="tab"
                                                                    aria-controls="marketing"
                                                                    aria-selected={activeTab === 'marketing'}
                                                                    onClick={() => handleTabClick('marketing')}
                                                                >
                                                                    Admission
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    className={`footer_link ${activeTab === 'info' ? 'active' : ''}`}
                                                                    id="info-tab"
                                                                    data-toggle="tab" // Keep for Bootstrap CSS, but logic is handled by React
                                                                    data-target="#info"
                                                                    type="button"
                                                                    role="tab"
                                                                    aria-controls="info"
                                                                    aria-selected={activeTab === 'info'}
                                                                    onClick={() => handleTabClick('info')}
                                                                >
                                                                    Info
                                                                </a>
                                                            </li>
                                                        </ul>

                                                        <div className="tab-content" id="myTabContent">
                                                            <div
                                                                className={`tab-pane fade ${activeTab === 'marketing' ? 'show active' : ''}`}
                                                                id="marketing"
                                                                role="tabpanel"
                                                                aria-labelledby="marketing-tab"
                                                            >
                                                                <ul>
                                                                    <li>Email: marketing@lscs.sch.id</li>
                                                                    <li>Tel: 0811-8880-678</li>
                                                                    <li>
                                                                        Jalan Taman Surya 5 Blok EE2 No.20-27, RT.2/RW.3,
                                                                        Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah
                                                                        Khusus Ibukota Jakarta 11830
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div
                                                                className={`tab-pane fade ${activeTab === 'info' ? 'show active' : ''}`}
                                                                id="info"
                                                                role="tabpanel"
                                                                aria-labelledby="info-tab"
                                                            >
                                                                <ul>
                                                                    <li>Email: info@lscs.sch.id</li>
                                                                    <li>Tel: 0813-1060-2143</li>
                                                                    <li>
                                                                        Jalan Taman Surya 5 Blok EE2 No.20-27, RT.2/RW.3,
                                                                        Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah
                                                                        Khusus Ibukota Jakarta 11830
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row copyright_row">
                                <div className="col">
                                    <div className="copyright d-flex flex-lg-row flex-column align-items-center justify-content-center">
                                        <div className="cr_text">
                                            Copyright © All rights reserved.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </>
            ) : (
                <>
                    <footer
                        ref={footerRef}
                        className={`footer-sticky ${visible ? "footer-visible" : "footer-hidden"
                            }`}
                    >
                        <div
                            className="copyright d-flex align-items-center justify-content-between px-4"
                            style={{
                                backgroundImage:
                                    "url(/img/footer-sticky2.png)",
                                transform: "translateY(0%)",
                                opacity: 1,
                                transition:
                                    "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                                height: "60px",
                            }}
                        >
                            {/* Logo di kiri */}
                            <div className="d-none d-md-block" style={{ flex: "0 0 auto", paddingLeft: "50px", paddingTop: "10px" }}>
                                <img
                                    src="/img/logo-panjang.png"
                                    alt="logo"
                                    style={{
                                        height: "70px", // Ukuran diperbesar
                                        objectFit: "contain",
                                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" // Jika perlu efek kontras
                                    }}
                                />
                            </div>

                            {/* Teks di tengah */}
                            <div
                                className="cr_text text-center mx-auto"
                                style={{
                                    flex: "1",
                                    fontSize: "14px",
                                    color: "#fff",
                                    fontWeight: "500",
                                    paddingTop: "10px",
                                }}
                            >
                                <span className="ml-5 ml-md-0">Copyright © All rights reserved.</span>
                            </div>

                            {/* Spacer kanan (untuk penyeimbang layout tengah) */}
                            <div className="d-none d-md-block" style={{ flex: "0 0 auto", width: "55px", visibility: "hidden" }}>
                                <img
                                    src="/img/logo-panjang.png"
                                    alt=""
                                    style={{ height: "70px" }}
                                />
                            </div>
                        </div>
                    </footer>
                </>
            )}
        </>
    );
};

export default Footer;
