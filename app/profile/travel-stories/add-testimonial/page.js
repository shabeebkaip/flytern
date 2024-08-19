"use client"
import StoreProvider from "@/app/StoreProvider"
import AddTestimonial from "./components/AddTestimonial"

const page = () => {
    return (
        <div className='container px-4 mx-auto md:px-0'>
            <StoreProvider>
                    <AddTestimonial />
                    </StoreProvider>
        </div>
    )
}

export default page