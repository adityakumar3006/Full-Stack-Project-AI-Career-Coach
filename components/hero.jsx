
"use client";
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {


    const imageRef = useRef(null);

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThresold = 50; // Adjust this value as needed

            if (scrollPosition > scrollThresold) {
                imageElement.classList.add("scrolled");
            }
            else {
                imageElement.classList.remove("scrolled");
            }

        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);



    }, [])
    return (
        <section className='w-full pt-36 md:pt-48 pb-10'>

            <div className='space-y-6 text-center'>
                <div className='space-y-6 mx-auto'>
                    <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl '>
                        Your Career AI coach for
                        <br />
                        Professional success
                    </h1>
                    <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                        Advance your carrer with personalized guidance,interview prep,
                        and resume building tools powered by AI.

                    </p>
                </div>

                <div className='flex justify-center space-x-4'>
                    <Link href={"/dashboard"}>
                        <Button size="lg" className={"px-8"}>
                            Get started
                        </Button>
                    </Link>
                    <Link href="https://www.youtube.com/">
                        <Button size="lg" className={"px-8"} variant="outline">
                            Get started
                        </Button>
                    </Link>

                </div>
                <div className='hero-image-wrapper mt-5 md:mt-0'>
                    <div ref={imageRef} className='hero-image'>
                        <Image
                            src={"/banner.jpeg"}
                            width={1300}
                            height={700}
                            alt="banner image"
                            className="rounded-lg shadow-2xl border mx-auto"
                            priority

                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
