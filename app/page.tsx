import { Container, Navbar } from "react-bootstrap";

import AnimatedBanner from './animatedBanner';
import layout from './layout';

export default async function Page() {
  return (
    <div>
        <div>
          <AnimatedBanner />
        </div>
        <div className="uniswap">
          Gimmie yo money  
        </div>
        <div className="grid grid-cols-3 grid-rows-1" style={{ gridTemplateColumns: '.5fr .5fr 1fr' }}> 
          <div className="curved-box">
            <span>user wallet info</span>
            <span>10</span>
          </div>
          <div className="curved-box1">
            <span>UNISWAP</span>
            <span>See all your staked crypto</span>
          </div>
          <div className="curved-box2">
            <span>uniswap pic</span>
          </div>
        </div>
    </div>
  );
}