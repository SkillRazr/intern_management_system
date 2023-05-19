import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="border border-black m-4 rounded apps">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
