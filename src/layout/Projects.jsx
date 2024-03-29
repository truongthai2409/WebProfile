// import React from 'react';

import { Element } from "react-scroll";
import ProjectCard from "../compoments/ProjectCard";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ProjectName, ProjectURL, ProjectImage } from '../utils/DataProject';

const Projects = () => {
  

    gsap.registerPlugin(ScrollTrigger);
    const container = useRef();
   
    useGSAP(() => {
        gsap.from(".project",{
            opacity: 0,
            y: -50,
            duration: 3,
            scrollTrigger: {
                trigger: ".project",
                end: "50px",
                // markers: true
            }
        })
    }, {scope: container})

    return (
        <Element name="Projects">
            <section ref={container} className="h-[100vh] bg-image">
                <div className="flex items-center justify-center">
                    <div className="max-w-screen-xl project">
                        <h1 className="p-4 text-4xl text-center text-white">My Projects</h1>
                        <div className="relative grid grid-cols-3 grid-rows-1 gap-5 bg-white rounded-xl">
                            <ProjectCard projectName={ProjectName.pops} ProjectURL={ProjectURL.pops} ProjectImage={ProjectImage.pops}></ProjectCard>
                            <ProjectCard projectName={ProjectName.figma} ProjectURL={ProjectURL.figma} ProjectImage={ProjectImage.figma}></ProjectCard>
                            <ProjectCard projectName={ProjectName.movie} ProjectURL={ProjectURL.movie} ProjectImage={ProjectImage.movie}></ProjectCard>
                        </div>
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Projects;