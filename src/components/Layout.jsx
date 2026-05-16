import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import BackToTop from './BackToTop.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import Sidebar from './Sidebar.jsx'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col">
      <Navbar />
      <div className="flex flex-1 w-full">
        {/* <Sidebar /> */}
        <main className="flex-1 w-full pt-20 sm:pt-24 md:pt-28 lg:pt-28 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">{children}</main>
      </div>
      <Footer />
      <BackToTop />
      <WhatsAppButton phoneNumber="1234567890" message="Hello! I would like to know more about SeerahVerse Academia courses." />
    </div>
  )
}

export default Layout

