import React from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';

const Error404 = () => {
  return (
   <>
   <Header />
    <>
    <section className="shop_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>404</h2>
          </div>
          <div className="row">
            <div className='col-12 text-center'>
              <h4>Page Not Found...!</h4>
              <Link className='btn btn-success mt-3 mb-3' to="/">BACK TO HOME</Link>
            </div>
          </div>
        </div>
      </section>
    </>
    <Footer />
   </> 
  )
}

export default Error404;