import Navbar from "@/components/buyer/navbar"
import Footer from "@/components/buyer/footer"

export default function BuyerLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
