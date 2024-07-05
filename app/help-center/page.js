"use client"
import React from 'react'
import StoreProvider from '../StoreProvider'
import HelpCenter from './contents/HelpCenter'
import { SnackbarProvider } from 'notistack'
import { getGlobalCookie } from '@/lib/utils'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const page = () => {
    const language = getGlobalCookie('language');

    // Conditionally add rtlPlugin to stylisPlugins based on the language
    const stylisPlugins = language === 'ar' ? [prefixer, rtlPlugin] : [prefixer];

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: stylisPlugins,
    });

    const theme = createTheme({
        direction: language === 'ar' ? 'rtl' : 'ltr',
        typography: {
            fontFamily: language === 'ar' ? 'arabic' : 'inter,sans-serif',
        }
    });

    return (
        <div className='container mx-auto '>
            <SnackbarProvider maxSnack={3}>
                <StoreProvider>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <HelpCenter />
                        </ThemeProvider>
                    </CacheProvider>
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default page