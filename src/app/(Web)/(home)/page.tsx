import CategorySelection from "@/components/Pages/Web/Home/CategorySelection";
import FeaturedProducts from "@/components/Pages/Web/Home/FeaturedProducts";
import Hero from "@/components/Pages/Web/Home/Hero";

export default function page() {
    
    return (
        <div>
            <Hero/>
            <CategorySelection/>
            <FeaturedProducts/>
        </div>
    )
}
