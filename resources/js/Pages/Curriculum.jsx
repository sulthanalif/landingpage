import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Curriculum = () => {
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
                                            <li>Curriculum</li>
                                            <li>Explanation</li>
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
                                        Program Pendidikan di Lia Stephanie
                                    </h2>
                                    <div className="section_subtitle">
                                        <p className="font-italic">
                                            Membentuk Generasi Takut akan Tuhan,
                                            Mencintai Sesama dan Lingkungan
                                            Ciptaan Nya dan Berjiwa
                                            Entrepreneuers
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row feature_row">
                            {/* Feature Content */}
                            <div className="col-lg-6 feature_col">
                                <div className="feature_content">
                                    <h3 className="mb-3">
                                        Pendekatan Belajar Kami
                                    </h3>
                                    {/* Accordions */}
                                    <div className="accordions">
                                        <div className="elements_accordions">
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center active">
                                                    <div>Kurikulum Terpadu</div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Menggabungkan Kurikulum
                                                        Nasional dengan
                                                        pendekatan pembelajaran
                                                        abad 21:{" "}
                                                        <i>
                                                            critical thinking,
                                                            collaboration,
                                                            creativity,
                                                        </i>{" "}
                                                        dan
                                                        <i>communication</i>.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Integrasi Teknologi
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Siswa terbiasa
                                                        menggunakan perangkat
                                                        digital untuk mendukung
                                                        proses belajar mulai
                                                        dari e-learning, kelas
                                                        hybrid, hingga platform
                                                        evaluasi daring.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Pembelajaran Berbasis
                                                        Proyek (Project-Based
                                                        Learning)
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Melatih siswa untuk
                                                        memahami konsep,
                                                        menyelesaikan masalah
                                                        nyata, dan
                                                        mempresentasikan hasil
                                                        kerja secara mandiri
                                                        atau tim.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Pendidikan Karakter &
                                                        Global Insight
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Melalui kegiatan sosial,
                                                        keagamaan, dan program
                                                        internasional, kami
                                                        menanamkan nilai moral
                                                        serta membuka wawasan
                                                        global bagi siswa sejak
                                                        dini.
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
                                                "url(/img/logo.png)",
                                        }}
                                    />
                                    <a
                                        className="vimeo feature_video_button"
                                        href="https://www.youtube.com/watch?v=2sWZz5JAE4Y"
                                        title="Video Pembelajaran"
                                        target="_blank"
                                    >
                                        <img
                                            src="/landing/images/play.png"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title_container text-center">
                                    <h2 className="section_title">
                                        Tujuan Kami: Bukan Sekadar Nilai Tinggi,
                                        Tapi Anak yang Siap Hadapi Dunia
                                    </h2>
                                    <div className="section_subtitle">
                                        <p>
                                            Setiap program dirancang agar siswa
                                            tidak hanya unggul secara akademik,
                                            tapi juga siap secara mental dan
                                            sosial menghadapi tantangan masa
                                            depan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row about_row">
                            {/* About Item */}
                            <div className="col-lg-4 about_col about_col_left">
                                <div className="about_item">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/about_1.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p>Program Pendidikan Internasional</p>
                                        <small className="font-italic">
                                            Menjadi Bagian dari Dunia, Dimulai
                                            dari Sini
                                        </small>
                                    </div>
                                    <div className="about_item_text">
                                        <p>
                                            Di Lia Stephanie, kami percaya bahwa
                                            pendidikan berkualitas global
                                            membuka pintu menuju masa depan yang
                                            lebih luas. Untuk itu, kami
                                            menghadirkan dua program
                                            internasional terkemuka di dunia:{" "}
                                            <strong>Edexcel</strong> dan{" "}
                                            <strong>
                                                International Baccalaureate (IB)
                                            </strong>{" "}
                                            sebagai jalur utama menuju
                                            keberhasilan akademik dan
                                            pengembangan diri siswa secara
                                            menyeluruh.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 about_col about_col_left">
                                <div className="about_item">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/about_1.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p>Edexcel Curriculum</p>
                                        <small className="font-italic">
                                            Akademik Berkualitas Inggris,
                                            Didesain untuk Dunia
                                        </small>
                                    </div>
                                    <div className="about_item_text">
                                        <p>
                                            Edexcel adalah kurikulum asal
                                            Inggris yang berfokus pada
                                            penguasaan materi akademik melalui
                                            pendekatan yang sistematis,
                                            analitis, dan berbasis kompetensi.
                                            Cocok untuk siswa yang ingin
                                            melanjutkan pendidikan ke
                                            universitas-universitas top dunia.{" "}
                                            <br />
                                            <strong>Kami menyediakan:</strong>
                                            <ul>
                                                <li>
                                                    <strong>
                                                        Lower Secondary (Key
                                                        Stage 3)
                                                    </strong>
                                                    – Usia 11–14 tahun
                                                </li>
                                                <li>
                                                    <strong>
                                                        IGCSE (Key Stage 4)
                                                    </strong>
                                                    – Usia 14–16 tahun
                                                </li>
                                                <li>
                                                    <strong>
                                                        A-Level (Key Stage 5)
                                                    </strong>
                                                    – Usia 16–18 tahun
                                                </li>
                                            </ul>
                                            <strong>Keunggulan Edexcel:</strong>
                                            <ul>
                                                <li>
                                                    Materi pelajaran yang
                                                    mendalam & terstruktur
                                                </li>
                                                <li>
                                                    Penilaian berbasis standar
                                                    internasional
                                                </li>
                                                <li>
                                                    Fokus pada kemampuan
                                                    analisis dan akademik
                                                </li>
                                                <li>
                                                    Diakui oleh lebih dari 150
                                                    negara dan universitas
                                                    ternama
                                                </li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 about_col about_col_left">
                                <div className="about_item">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/about_1.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p>
                                            International Baccalaureate (IB)
                                            Programme
                                        </p>
                                        <small className="font-italic">
                                            Mendidik dengan Perspektif Global &
                                            Jiwa Kritis
                                        </small>
                                    </div>
                                    <div className="about_item_text">
                                        <p>
                                            Program IB dikenal karena
                                            pendekatannya yang seimbang:
                                            menggabungkan aspek akademik,
                                            keterampilan hidup, dan kesadaran
                                            sosial global. Kami menyelenggarakan
                                            tiga jenjang utama:
                                            <ul>
                                                <li>
                                                    <strong>
                                                        Primary Years Programme
                                                        (PYP)
                                                    </strong>
                                                    – Usia 3–12 tahun
                                                </li>
                                                <li>
                                                    <strong>
                                                        Middle Years Programme
                                                        (MYP)
                                                    </strong>
                                                    – Usia 11–16 tahun
                                                </li>
                                                <li>
                                                    <strong>
                                                        Diploma Programme (DP)
                                                    </strong>
                                                    – Usia 16–19 tahun
                                                </li>
                                            </ul>
                                            <strong>Filosofi IB:</strong>
                                            <ul>
                                                <li>
                                                    <i>
                                                        Inquiry-based learning
                                                    </i>
                                                    (pembelajaran berbasis rasa
                                                    ingin tahu)
                                                </li>
                                                <li>
                                                    Fokus pada pelajar yang
                                                    mandiri, reflektif, dan
                                                    berpikir global
                                                </li>
                                                <li>
                                                    Penekanan pada keseimbangan
                                                    antara sains, seni, dan
                                                    humaniora
                                                </li>
                                                <li>
                                                    Memperkuat nilai-nilai
                                                    internasional, empati, dan
                                                    tanggung jawab sosial
                                                </li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 about_col about_col_left">
                                <div className="about_item">
                                    <div className="about_item_title">
                                        <p>
                                            Dua Jalur, Satu Tujuan: Masa Depan
                                            Terbaik untuk Anak Anda
                                        </p>
                                    </div>
                                    <div className="about_item_text">
                                        <p>
                                            Baik melalui Edexcel maupun IB,
                                            siswa kami dilatih untuk menjadi
                                            pembelajar seumur hidup, mampu
                                            bersaing secara global, dan tetap
                                            memiliki nilai-nilai luhur dalam
                                            hidup mereka.
                                        </p>
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

export default Curriculum;
