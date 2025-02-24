import { usePage } from "@inertiajs/react";
import Layout from "../Components/Layout";
import Hero from "./Sections/Hero";
import About from "./Sections/About";
import News from "./Sections/News";
import Value from "./Sections/Value";
import Activity from "./Sections/Activity";
import Admission from "./Sections/Admission";
import Faq from "./Sections/Faq";

export default function Home() {
    const props = usePage().props;

    return (
        <>
            <Layout>
                <Hero />
                <About />
                <News />
                <Value />
                <Activity />
                <Admission />
                <Faq />
            </Layout>
        </>
    );
}
