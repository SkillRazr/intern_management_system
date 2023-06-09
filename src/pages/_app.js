import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <div className="border border-black m-4 rounded apps">
      <Toaster/>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
