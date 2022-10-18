import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { useEffect } from "react";

// export default function MyApp({ Component, pageProps }) {
//   const [showChild, setShowChild] = useState(false);
//   useEffect(() => {
//     setShowChild(true);
//   }, []);

//   if (!showChild) {
//     return null;
//   }

//   if (typeof window === 'undefined') {
//     return <></>;
//   } else {
//     return (
//       <div>
//         <Component {...pageProps} />
//       </div>
//     );
//   }
// }

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

// export default MyApp;
