import { Sidebar } from "../layouts/sidebar";
import { cn } from "../utils/cn";
import { Header } from "../layouts/header";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import {useClickOutside} from "../hooks/use-click-outside";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width:768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, {isDesktopDevice});

    useClickOutside(sidebarRef, () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            {/* Overlay for collapsed state */}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black-opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:opacity-30 max-md:z-50"
                )}
            />
            {/* Sidebar */}
            <Sidebar ref={sidebarRef} collapsed={collapsed} />

            {/* Main Content Wrapper */}
            <div
                className={cn(
                    "transition-[margin] duration-300",
                    collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
                )}
            >
                {/* Header with Fixed Background */}
                <div className="sticky top-0 z-50 bg-slate-900">
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                </div>

                {/* Content Area */}
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;