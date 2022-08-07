import React, { useRef, useLayoutEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import { Container } from '@mui/material';

import Banner from './banner';
import Home from './pages/home';
import Profile from './pages/profile';
import Workspaces from './pages/workspaces';
import PageNotFound from './pagenotfound';

const PageLayout = () => {
    const refContentContainer = useRef<HTMLDivElement>(null);

    const sizeContentContainenr = () => {
        let contentContainerPosition = refContentContainer.current.getBoundingClientRect().top;
        let bottomPadding = 10;
        let contentContainerHeight = (window.innerHeight - contentContainerPosition - bottomPadding) + "px"
        refContentContainer.current.style.minHeight = contentContainerHeight;
    };

    useLayoutEffect(() => {
        sizeContentContainenr();
        window.addEventListener("resize", sizeContentContainenr);
    });

    return (
        <Container maxWidth={"lg"} >
            <Banner />
            <Container sx={{ border: 1 }} ref={refContentContainer} >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="workspaces" element={<Workspaces />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Container>
        </Container>
    )
}

export default PageLayout