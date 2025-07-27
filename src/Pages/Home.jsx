import React from 'react';
import Testimonials from '../component/Testimonials';
import HeroSection from '../component/HeroSection';
import PopularPolicies from '../component/PopularPolicies';
import LatestBlog from '../component/LatestBlog';
import Newsletter from '../component/Newsletter';
import OurAgents from '../component/OurAgents';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <PopularPolicies></PopularPolicies>
            <LatestBlog></LatestBlog>
            <Newsletter></Newsletter>
            <OurAgents></OurAgents>
            <Testimonials></Testimonials>

        </div>
    );
};

export default Home;