"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// تعطيل المؤشر الدائري
NProgress.configure({ showSpinner: false, speed: 500 });

export default function ProgressBar() {
    const pathname = usePathname();
    const { theme } = useTheme();

    useEffect(() => {
        const progressColor = theme === "dark" ? "#fff" : "#000";

        // ضبط لون الشريط باستخدام CSS مباشرة
        const styleTag = document.createElement("style");
        styleTag.innerHTML = `
            #nprogress .bar {
                background: ${progressColor} !important;
            }
        `;
        document.head.appendChild(styleTag);

        NProgress.start();
        const timer = setTimeout(() => {
            NProgress.done();
        }, 500);

        return () => {
            clearTimeout(timer);
            NProgress.done();
            document.head.removeChild(styleTag);
        };
    }, [pathname, theme]);

    return null;
}
