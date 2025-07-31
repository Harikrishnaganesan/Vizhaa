declare module 'lottie-react' {
  import * as React from 'react';
  export interface LottieProps {
    animationData: object;
    loop?: boolean;
    [key: string]: unknown;
  }
  const Lottie: React.FC<LottieProps>;
  export default Lottie;
}
