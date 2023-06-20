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
        
        <div>
          uniswap 
        </div>
        
      </div>
    </div>
  );
}