import Navbar from "@/components/buyer/navbar"
import Footer from "@/components/buyer/footer"
import SellerNavbar from "@/components/seller/sellerNavbar"
import '/styles/utils.css'

export default function BuyerLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
