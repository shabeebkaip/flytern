"use client"
import StoreProvider from "@/app/StoreProvider"
import AddTestimonial from "./components/AddTestimonial"
import { SnackbarProvider } from "notistack"

const page = () => {
    return (
        <div className='container px-4 mx-auto md:px-0'>
            <SnackbarProvider>
            <StoreProvider>
                    <AddTestimonial />
                    </StoreProvider>
                    </SnackbarProvider>
        </div>
    )
}

export default page