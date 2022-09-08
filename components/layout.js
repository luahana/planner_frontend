import Navbar from './navbar'
// import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='main'>{children}</main>
      <footer></footer>
      {/* <Footer /> */}
    </>
  )
}
