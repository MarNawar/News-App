import React from 'react'
import { Link } from 'react-router-dom/dist'

function About() {
  return (
    <>
      <div class="col-lg-8 mx-auto p-4 py-md-5 my-5">
      <header class="d-flex align-items-center pb-3 mb-5 border-bottom">
        <a href="/" class="d-flex align-items-center text-body-emphasis text-decoration-none">
          <span class="fs-4">ABOUT</span>
        </a>
      </header>

      <main>
        <h1 class="text-body-emphasis">News App</h1>
        <p class="fs-5 col-md-8">A React app for your personalized news companion. Get breaking news, trending stories, feed tailored to your interests and catagories with an intuitive interface. Checkout now for a smarter news experience. {' '}
        </p>

        <div class="mb-5">
          <Link to="/" class="btn btn-primary btn-lg px-4">Version<span className='text-white'> 1.0.0</span></Link>
        </div>


        <div class="row g-5">
          <div class="col-md-6">
            <h2 class="text-body-emphasis">Links</h2>
            <p>Find out about Developer</p>
            <ul class="list-unstyled ps-0">
              <li>
              LinkedIN :
                <a class="icon-link mb-1" href="https://www.linkedin.com/in/puneetvishnoi2017/" rel="noopener" target="_blank">
                  <svg class="bi" width="16" height="16"><use href="#arrow-right-circle"></use></svg>
                  Puneet Vishnoi
                </a>
              </li>
              <li>
              Github :
                <a class="icon-link mb-1" href="https://github.com/MarNawar" rel="noopener" target="_blank">
                  <svg class="bi" width="16" height="16"><use href="#arrow-right-circle"></use></svg>
                  MarNawar
                </a>
              </li>
              <li>
              Email :
                  <svg class="bi" width="16" height="16"><use href="#arrow-right-circle"></use></svg>
                  puneetvishnoi2017@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </main>
      <footer class="pt-5 my-2 text-body-secondary border-top">
        Created by the Puneet Vishnoi
      </footer>
    </div>
    </>
  )
}

export default About