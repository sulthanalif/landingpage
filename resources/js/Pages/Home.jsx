import { usePage } from "@inertiajs/react";
import Layout from "../Components/Layout";
import Hero from "./Sections/Hero";
import About from "./Sections/About";
import News from "./Sections/News";
import Value from "./Sections/Value";
import Activity from "./Sections/Activity";
import Admission from "./Sections/Admission";
import Faq from "./Sections/Faq";

import React from "react";

const Home = (props) => {
    return (
        <>
            <Layout>
                <Hero />
                <About />
                <News posts={props.posts} />
                <Value />
                <Activity activities={props.activities} />
                <Admission />
                <Faq faqs={props.faqs} />
            </Layout>
        </>
    );
};

export default Home;
