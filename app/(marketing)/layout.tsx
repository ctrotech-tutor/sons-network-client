// app/(marketing)/layout.tsx
import Footer from "@/components/core/Footer";
import Navbar from "@/components/core/Navbar"; // <-- IMPORT

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar /> {/* <-- USE THE COMPONENT HERE */}
      <main className="grow">{children}</main>
      {/* We will add the Footer component here later */}
      <Footer />
    </div>
  );
}
