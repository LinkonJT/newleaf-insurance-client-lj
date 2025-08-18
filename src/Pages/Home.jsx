import React from 'react';
import Testimonials from '../component/Testimonials';
import HeroSection from '../component/HeroSection';
import PopularPolicies from '../component/PopularPolicies';
import LatestBlog from '../component/LatestBlog';
import Newsletter from '../component/Newsletter';
import OurAgents from '../component/OurAgents';
import Faq from './Faq';
import Promotions from '../component/Promotions';


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <PopularPolicies></PopularPolicies>
            <LatestBlog></LatestBlog>
            <Newsletter></Newsletter>
            <OurAgents></OurAgents>
            <Testimonials></Testimonials>
            <Promotions></Promotions>
          <Faq></Faq>
            

        </div>
    );
};

export default Home;