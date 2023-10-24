import Image from "next/image";
// USER IMPORT.
import Auth from "@bridge/Auth";

export default function Authentication() {
  return (
    <main className="bg-[#f9f9ff] h-screen flex items-center justify-center">
      <Auth />
    </main>
  );
}
