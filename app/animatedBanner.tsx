import '../app/globals.css'

import React from 'react';

export default function AnimatedBanner() {
    return (
        <div className="position-relative marquee-container d-none d-sm-block">
            <div className="marquee d-flex justify-content-around">
                <span>
                    All in one tracker for your wallet 
                </span>
            </div>
            <div className="marquee marquee2 d-flex justify-content-around">
                <span>
                    All in one tracker for your wallet 
                </span>
            </div>
        </div>
    )    
}