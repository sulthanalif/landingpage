import { usePage } from "@inertiajs/react";
import Layout from "../Components/Layout";
import Carousel from "./Sections/Carousel";
import Service from "./Sections/Service";
import About from "./Sections/About";
import Categories from "./Sections/Categories";
import Courses from "./Sections/Courses";
import Team from "./Sections/Team";
import Testimonial from "./Sections/Testimonial";

export default function Home() {
    const props = usePage().props;

    return (
        <>
            <Layout>
                <Carousel />
                <Service />
                <About />
                <Categories />
                <Courses />
                <Team />
                <Testimonial />
            </Layout>
        </>
    );
}
