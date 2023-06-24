import { Container, Navbar } from "react-bootstrap";

import AnimatedBanner from './animatedBanner';
import layout from './layout';

export default async function Page() {
  return (
    <div>
      <div className="backgroundColor">
        <div>
          <AnimatedBanner />
        </div>
        
        <div className="uniswap">
          Gimmie yo money  
        </div>
        
        <div className="curved-box">
          <div className="uniswap">
            Uniswap
          </div>
          <div className="uniswap">
            See all your staking
            </div>
              <div className="row">
                <div className="col-4">
                  
                  <div className="verticle-line">
                <div className="col-8">
                </div>  
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}