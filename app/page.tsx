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
        <div className="flex">
          <div className="flex-auto w-1 mr-10 ml-5">
              <div className="curved-box">
                <div className="uniswap">user wallet info</div>
              </div>
          </div>
            <div className="flex-auto w-96 mr-5">
              <div className="curved-box">
                <div className="uniswap">UNISWAP</div>
                <div className="uniswap">See all your staked crypto</div>
              </div>
          </div>
        </div>     
    </div>
  );
}