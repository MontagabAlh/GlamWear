
interface LayoutProps {
    children: React.ReactNode;
};

export default function SiteLayout({ children }: LayoutProps) {
    return (
        <>
            {children}
        </>
    );
}
