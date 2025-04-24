import { Link } from "@inertiajs/react";
import React from "react";

const About = () => {
    return (
        <>
            <div className="features" id="about">
                <div className="container">
                    <div className="row features_row">
                        <div className="col-lg-6">
                            <img
                                src="/landing/images/about.jpg"
                                alt=""
                                loading="lazy"
                                className="img-fluid mx-auto d-block"
                            />
                        </div>
                        <div className="col-lg-6 feature_col">
                            <div className="feature trans_400">
                                <h2 className="feature_title">
                                    Discover our School
                                </h2>
                                <hr className="feature_line" />
                                <div className="feature_text mt-3 text-justify">
                                    <p>
                                        Di Lia Stephanie, kami percaya bahwa
                                        pendidikan bukan hanya soal nilai
                                        akademis, tapi juga tentang membentuk
                                        karakter, membangun rasa percaya diri,
                                        dan menyiapkan generasi masa depan yang
                                        tangguh dan berakhlak.
                                    </p>
                                    <p>
                                        Di Lia Stephanie, kami percaya bahwa
                                        pendidikan bukan hanya soal nilai
                                        akademis, tapi juga tentang membentuk
                                        karakter, membangun rasa percaya diri,
                                        dan menyiapkan generasi masa depan yang
                                        tangguh dan berakhlak.
                                    </p>
                                    <p>
                                        Dengan kurikulum yang terintegrasi,
                                        tenaga pengajar berpengalaman, serta
                                        lingkungan belajar yang nyaman dan aman,
                                        kami berkomitmen memberikan pendidikan
                                        terbaik untuk setiap anak.
                                    </p>
                                    <p>
                                        Di Lia Stephanie, kami menghadirkan
                                        program pendidikan yang dirancang secara
                                        menyeluruh untuk mendukung perkembangan
                                        akademik, emosional, sosial, dan
                                        spiritual siswa. Kami percaya bahwa
                                        setiap anak memiliki potensi unik yang
                                        perlu diasah melalui pendekatan belajar
                                        yang tepat dan relevan dengan zaman.
                                    </p>
                                    <Link
                                        href="/about"
                                        className="btn btn-primary mt-3"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
