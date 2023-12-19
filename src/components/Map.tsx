import { useEffect, useRef } from "react";

import { Box, useTheme } from "@mui/material";

const Map = () => {
    return (
        <Box position={"relative"} width={"100%"} height={"100%"} sx={{ pointerEvents: "none" }}>
            <SteamboatInteractiveMap />
        </Box>
    );
};

const SteamboatInteractiveMap = () => {
    const { VITE_MAP_ANIMATIONS } = import.meta.env;
    const mapRef = useRef<HTMLIFrameElement>(null);
    const theme = useTheme();
    useEffect(() => {
        const iframeReactLoadDelayTimeout = setTimeout(() => {
            if (mapRef.current) {
                const iframeWindow = mapRef.current.contentWindow;
                setUserAgent(iframeWindow, "Mozilla/5.0");

                const iframeDocument = iframeWindow?.document;
                if (iframeDocument) {
                    [
                        iframeDocument.getElementById("fullscreen"),
                        iframeDocument.getElementById("zoomControls"),
                        iframeDocument.getElementById("menu"),
                        iframeDocument.getElementById("infoLayer")
                    ].forEach((element) => element?.remove());

                    const map = iframeDocument.getElementById("_Image1");

                    // if (map && theme.palette.mode === "dark") {
                    //     map.setAttributeNS(
                    //         "http://www.w3.org/1999/xlink",
                    //         "xlink:href",
                    //         "https://raw.githubusercontent.com/matthewfernst/Mountain-UI/main/src/assets/images/SteamboatDarkMode.jpg"
                    //     );
                    // }
                }
            }
        }, 5000);
        return () => clearTimeout(iframeReactLoadDelayTimeout);
    }, [mapRef, theme]);

    const setUserAgent = (window: Window | null, userAgent: string) => {
        if (window && window.navigator.userAgent != userAgent) {
            const userAgentProp = { get: () => userAgent };
            try {
                Object.defineProperty(window.navigator, "userAgent", userAgentProp);
            } catch (e) {
                (window as any).navigator = Object.create(navigator, { userAgent: userAgentProp });
            }
        }
    };

    const opacity = theme.palette.mode === "dark" ? 1 : 0.8;

    return (
        <iframe
            src={`https://vicomap-cdn.resorts-interactive.com/map/1800?fullscreen=true&menu=3.7,3.10,3.14&openLiftAnimation=${VITE_MAP_ANIMATIONS}&openLiftColor=green&liftHighlightOpacity=0.1&backgroundOpacity=${opacity}`}
            width="100%"
            height="100%"
            allowFullScreen
            style={{ border: "none", pointerEvents: "auto" }}
            ref={mapRef}
        />
    );
};

export default Map;
