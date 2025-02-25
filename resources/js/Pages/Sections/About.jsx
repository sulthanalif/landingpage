import React from "react";

const About = () => {
    return (
        <>
            <div className="features">
                <div className="container">
                    <div className="row features_row">
                        <div className="col-lg-6">
                            <img
                                src="/landing/images/course_1.jpg"
                                alt=""
                                loading="lazy"
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-lg-6 feature_col">
                            <div className="feature trans_400">
                                <h2 className="section_title">
                                    About Us
                                </h2>
                                <hr />
                                <div className="feature_text mt-3 text-justify">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, atque modi. Sapiente aspernatur, sit inventore iure sequi, eveniet ipsa sunt cupiditate ad harum itaque corrupti nulla asperiores iusto nam delectus incidunt, magni quam dolore hic laudantium omnis laboriosam illo! Facilis veniam sed incidunt obcaecati necessitatibus? Veniam dolore assumenda recusandae deleniti consequuntur corporis quidem impedit! Aperiam, ducimus impedit. Voluptas pariatur magnam earum harum, recusandae fugiat impedit commodi aliquam inventore et reiciendis.
                                    </p>
                                    <a href="#" className="btn btn-primary mt-3">Read More</a>
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
