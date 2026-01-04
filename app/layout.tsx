import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Notes app",
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode; 
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal} 
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
  
}
