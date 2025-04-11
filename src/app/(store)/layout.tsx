import Navbar from "@/components/Layout/Web/Navbar";

interface LayoutProps {
    children: React.ReactNode;
};

export default function SiteLayout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
                {children}
            </main>
        </>
    );
}
