import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Admission = () => {
    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "/landing/styles/about.css";

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "/landing/styles/about_responsive.css";

        document.head.appendChild(link1);
        document.head.appendChild(link2);

        const script = document.createElement("script");
        script.src = "/landing/js/about.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Layout>
                <div className="home">
                    <div className="breadcrumbs_container">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="breadcrumbs">
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>Admission</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="feature">
                    <div
                        className="feature_background"
                        style={{
                            backgroundImage:
                                "url(/landing/images/courses_background.jpg)",
                        }}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title_container text-center">
                                    <h2 className="section_title">
                                        Admission Guidelines
                                    </h2>
                                    {/* <div className="section_subtitle">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Donec
                                            vel gravida arcu. Vestibulum
                                            feugiat, sapien ultrices fermentum
                                            congue, quam velit venenatis sem
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row feature_row">
                            {/* Feature Content */}
                            <div className="col-lg-6 feature_col">
                                <div className="feature_content">
                                    {/* Accordions */}
                                    <div className="accordions">
                                        <div className="elements_accordions">
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center active">
                                                    <div>
                                                        Pengisian Formulir
                                                        Pendaftaran
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Isi formulir pendaftaran
                                                        secara online melalui
                                                        website kami atau
                                                        langsung datang ke
                                                        kantor administrasi
                                                        sekolah.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Unggah Dokumen Pendukung
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        <ul>
                                                            <li>
                                                                Akta kelahiran
                                                            </li>
                                                            <li>
                                                                Kartu identitas
                                                                orang tua
                                                            </li>
                                                            <li>
                                                                Rapor terakhir /
                                                                transkrip nilai
                                                            </li>
                                                            <li>
                                                                Pas foto terbaru
                                                            </li>
                                                        </ul>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Jadwal Wawancara &
                                                        Observasi Siswa ( test
                                                        tertulis )
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Tim akademik kami akan
                                                        mengatur sesi observasi
                                                        atau tes masuk sesuai
                                                        jenjang pendidikan,
                                                        serta wawancara singkat
                                                        dengan calon siswa dan
                                                        orang tua.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Pengumuman Hasil Seleksi
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Hasil seleksi akan
                                                        diinformasikan melalui
                                                        email dalam waktu 3–5
                                                        hari kerja setelah sesi
                                                        wawancara/observasi.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Proses Registrasi &
                                                        Pembayaran
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Jika diterima, orang tua
                                                        akan menerima rincian
                                                        biaya dan prosedur
                                                        pembayaran. Pendaftaran
                                                        akan dianggap sah
                                                        setelah seluruh
                                                        administrasi
                                                        diselesaikan.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Orientasi Siswa & Orang
                                                        Tua
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Calon siswa dan orang
                                                        tua akan mengikuti sesi
                                                        orientasi untuk mengenal
                                                        lingkungan sekolah,
                                                        sistem belajar, dan
                                                        komunitas sekolah kami.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Accordions End */}
                                </div>
                            </div>
                            {/* Feature Video */}
                            <div className="col-lg-6 feature_col">
                                <div className="feature_video d-flex flex-column align-items-center justify-content-center">
                                    <div
                                        className="feature_video_background"
                                        style={{
                                            backgroundImage:
                                                "url(img/logo.png)",
                                        }}
                                    />
                                    <a
                                        className="vimeo feature_video_button"
                                        href="https://player.vimeo.com/video/99340873?title=0"
                                        title="OH, PORTUGAL - IN 4K - Basti Hansen - Stock Footage"
                                    >
                                        <img
                                            src="/landing/images/play.png"
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <div className="feature-content mt-2">
                                    <div className="feature_note">
                                        <h4>Catatan Penting</h4>
                                        <p>
                                            <ul>
                                                <li>
                                                    Pendaftaran dibuka sepanjang
                                                    tahun dengan jumlah kuota
                                                    terbatas untuk tiap jenjang.
                                                </li>
                                                <li>
                                                    Prioritas diberikan untuk
                                                    siswa pindahan dari sekolah
                                                    berkurikulum serupa
                                                    (IB/Edexcel).
                                                </li>
                                                <li>
                                                    Semua proses seleksi
                                                    mempertimbangkan potensi
                                                    akademik dan kesiapan
                                                    sosial-emosional siswa.
                                                </li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="newsletter">
                    <div
                        className="newsletter_background parallax-window"
                        style={{
                            backgroundImage: `url('landing/images/newsletter.jpg')`,
                            backgroundAttachment: "fixed",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="newsletter_container d-flex flex-lg-row flex-column align-items-center justify-content-start">
                                    {/* Newsletter Content */}
                                    <div className="newsletter_content text-lg-left text-center">
                                        <div className="newsletter_title">
                                            Jadwalkan Kunjungan Sekolah
                                        </div>
                                        <div className="newsletter_subtitle">
                                            Kami menyarankan calon orang tua
                                            untuk melakukan school tour sebelum
                                            mendaftar. Hubungi tim admissions
                                            kami di 0811-8880-678 atau email
                                            marketing@lscs.sch.id untuk info
                                            lebih lanjut.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Admission;
