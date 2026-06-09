import React from 'react'
import HeroSection from './components/HeroSection'
import CreateAdSection from './components/CreateAdSection'
import PricingCards from './components/PricingCards'
import CTASection from './components/CTASection'
import PromoSection from '../public_Home/section/PromoSection'

const PricePage = () => {
    return (
        <div className="bg-[#FFFCF6]">
            <HeroSection />
            <PromoSection bg={"white"}/>
            <PricingCards />
            <CTASection />
        </div>
    )
}

export default PricePage