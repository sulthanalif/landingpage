import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Payment = () => {
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
                                            <li>Register</li>
                                            <li>Payment</li>
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
                                        Pay For Registration
                                    </h2>
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
                                                    <div>Bank Transfer</div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p className="d-flex flex-row mb-2">
                                                        <img
                                                            src="/landing/images/bca.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                        <img
                                                            src="/landing/images/bni.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                        <img
                                                            src="/landing/images/bri.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>Direct Debit</div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p className="d-flex flex-row mb-2">
                                                        <img
                                                            src="/landing/images/bca.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                        <img
                                                            src="/landing/images/bni.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                        <img
                                                            src="/landing/images/bri.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>E-Wallet</div>
                                                </div>
                                                <div className="accordion_panel">
                                                <p className="d-flex flex-row mb-2">
                                                        <img
                                                            src="/landing/images/dana.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                        <img
                                                            src="/landing/images/ovo.jpg"
                                                            className="img-fluid w-25 mr-2"
                                                        />
                                                        <img
                                                            src="/landing/images/seabank.png"
                                                            className="img-fluid w-25 mr-2"
                                                        />
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
                                <div className="feature_content">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                Registration ID #REG0238461624
                                            </h4>
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr class="text-center">
                                                            <th scope="col">
                                                                #
                                                            </th>
                                                            <th scope="col">
                                                                Item
                                                            </th>
                                                            <th scope="col">
                                                                Fee
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th
                                                                scope="row"
                                                                className="text-center"
                                                            >
                                                                1
                                                            </th>
                                                            <td>
                                                                Application Fee
                                                            </td>
                                                            <td className="text-center">
                                                                Rp. 5.000.000
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                scope="row"
                                                                className="text-center"
                                                            >
                                                                2
                                                            </th>
                                                            <td>School Fee</td>
                                                            <td className="text-center">
                                                                Rp. 20.000.000
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                scope="row"
                                                                className="text-center"
                                                            >
                                                                3
                                                            </th>
                                                            <td>
                                                                Tuition Fees
                                                            </td>
                                                            <td className="text-center">
                                                                Rp. 10.000.000
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot className="text-center">
                                                        <tr>
                                                            <th colspan="2">
                                                                <h5 className="text-muted">
                                                                    Total
                                                                </h5>
                                                            </th>
                                                            <td>
                                                                <h5 className="text-muted">
                                                                    Rp.
                                                                    35.000.000,-
                                                                </h5>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
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

export default Payment;
