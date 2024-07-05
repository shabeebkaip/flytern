"use client"
import StoreProvider from "@/app/StoreProvider"
import AddTestimonial from "./components/AddTestimonial"

const page = () => {
    return (
        <div className='container mx-auto '>
            <StoreProvider>
                    <AddTestimonial />
                    </StoreProvider>
        </div>
    )
}

export default page