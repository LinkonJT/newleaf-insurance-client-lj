import React from 'react';
import Testimonials from '../component/Testimonials';
import HeroSection from '../component/HeroSection';
import PopularPolicies from '../component/PopularPolicies';

const Home = () => {
    return (
        <div>
            <h2>this is home</h2>
            <HeroSection></HeroSection>
            <PopularPolicies></PopularPolicies>
            <Testimonials></Testimonials>

        </div>
    );
};

export default Home;