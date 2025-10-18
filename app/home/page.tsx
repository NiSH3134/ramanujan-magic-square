'use client';

import React, { useRef } from 'react'
import Hero from '../components/hero'
import References from '../components/references'
import { Header } from '../components/header';

const Home = () => {

  const heroRef = useRef<HTMLElement>(null);
  const referencesRef = useRef<HTMLElement>(null);

  const HEADER_HEIGHT = 64; // px, adjust based on your header

  const scrollToReferences = () => {
    const top = referencesRef.current?.offsetTop ?? 0;
    window.scrollTo({
      top: top - HEADER_HEIGHT,
      behavior: 'smooth',
    });
  };

  const scrollToHero = () => {
    const top = heroRef.current?.offsetTop ?? 0;
    window.scrollTo({
      top: top - HEADER_HEIGHT,
      behavior: 'smooth',
    });
  };



  return (
    <>
      <Header onHeroClick={scrollToHero} onReferencesClick={scrollToReferences} />
      <main className='pl-4 pr-4'>
        <Hero ref={heroRef} />
        <References ref={referencesRef} />
      </main>
    </>
  )
}

export default Home