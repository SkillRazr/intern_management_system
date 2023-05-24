import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Attendance from "@/components/Attendance";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Attendance />
    </main>
  );
}
