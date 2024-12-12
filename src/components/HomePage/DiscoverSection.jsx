'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import chatIcon from '@/images/chat.svg'
import discoverBg from '@/images/c-line.svg'
import d1 from '@/images/d1.png'
import d2 from '@/images/d2.webp'
import d3 from '@/images/d3.png'
import d4 from '@/images/d4.webp'
import d5 from '@/images/d5.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DiscoverSection = () => {
  const sectionRef = useRef(null)
  const secHeadRef = useRef(null)
  const dCardRefs = useRef([])
  const imgRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768) {
        return;
    }
    gsap.registerPlugin(ScrollTrigger)

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: 'discover-section',
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        pinSpacing: true,
        scrub: 2,
        markers: false,
      }
    })

    // Animate sec-head fade up
    timeline.fromTo(secHeadRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
    timeline.fromTo(imgRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })

    // Animate d-card images and h3 one by one
    dCardRefs.current.forEach((card, index) => {
      const img = card.querySelector('img')
      const h3 = card.querySelector('h3')
      timeline.fromTo(img, { scale: 0 }, { scale: 1, duration: 1 }, `-=${0.5 * index}`)
      timeline.fromTo(h3, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, `-=${0.5 * index}`)
    })

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [])

  return (
    <section className='discover-section' ref={sectionRef}>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-12 col-12'>
            <div className='text-center'>
              <h2 className='sec-head' ref={secHeadRef}>
                Choose Your Chill: <br className='d-none d-sm-block' />
                Discover spots to unwind and enjoy
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className='discover-sec-wrapper'>
        <Image src={discoverBg} ref={imgRef} alt='discover' />
        <div className='container'>
          <div className='d-grid'>
            {[d1, d2, d3, d4, d5].map((image, index) => (
              <div className='d-card' key={index} ref={el => dCardRefs.current[index] = el}>
                <Image src={image} alt='discover' />
                <h3>{['Cafés', 'Clubs', 'Restaurants', 'Beach Clubs', 'Bars & Lounges'][index]}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiscoverSection