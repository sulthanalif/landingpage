import React from "react";

const Value = () => {
    return (
        <>
            <div className="features">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">
                                    Mengapa Memilih Kami?
                                </h2>
                                {/* <div className="section_subtitle">
                                    <p>
                                        Strong beliefs and values are very
                                        important to us.
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row features_row">
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value3.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Kurikulum Holistik dan berwawasan Global
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Menggabungkan kurikulum nasiona dan
                                        berwawasan global dan pendekatan
                                        pembelajaran aktif yang mendorong
                                        kreativitas, berpikir kritis, dan
                                        kolaborasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value1.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Guru Profesional & Peduli
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Tim pendidik kami tidak hanya ahli dalam
                                        mengajar, tetapi juga hadir sebagai
                                        mentor yang memahami kebutuhan emosional
                                        dan perkembangan siswa.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value2.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Fasilitas Lengkap
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Moving class, Kelas interaktif,
                                        laboratorium sains, perpustakaan
                                        digital, ruang seni, hingga area
                                        olahraga—semua dirancang untuk menunjang
                                        proses belajar yang optimal.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Features Item */}
                        <div className="col-lg-3 feature_col">
                            <div className="feature text-center trans_400">
                                <div className="feature_icon">
                                    <img
                                        src="/landing/images/icon_value4.png"
                                        style={{
                                            maxHeight: "50px",
                                            maxWidth: "auto",
                                        }}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="feature_title">
                                    Pengembangan Karakter & Soft Skills
                                </h3>
                                <div className="feature_text">
                                    <p>
                                        Kami menanamkan nilai-nilai
                                        kedisiplinan, empati, dan kepemimpinan
                                        sejak dini melalui berbagai kegiatan
                                        sekolah.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Value;
