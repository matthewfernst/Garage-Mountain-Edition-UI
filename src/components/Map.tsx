import { useEffect, useRef } from "react";

import { Box, Button, Divider, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Map = () => {
    const theme = useTheme();
    return (
        <Box position={"relative"} width={"100%"} height={"100%"} sx={{ pointerEvents: "none" }}>
            <Box
                position={"absolute"}
                top={0}
                left={0}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"100%"}
            >
                <Box pb={2} pr={2} display={"flex"} justifyContent={"end"}>
                    <Box
                        display={"flex"}
                        sx={{
                            backgroundColor:
                                theme.palette.mode == "light"
                                    ? theme.palette.neutral.main
                                    : "#121212",
                            borderRadius: 5
                        }}
                    >
                        <Button
                            variant={"text"}
                            sx={{
                                pointerEvents: "auto",
                                backgroundColor:
                                    theme.palette.mode == "light"
                                        ? theme.palette.neutral.main
                                        : "#121212",
                                color:
                                    theme.palette.mode == "light"
                                        ? theme.palette.neutral.dark
                                        : theme.palette.neutral.main,
                                borderTopLeftRadius: 28,
                                borderBottomLeftRadius: 28
                            }}
                        >
                            <RemoveIcon sx={{ fontSize: 20 }} />
                        </Button>
                        <Divider orientation={"vertical"} flexItem />
                        <Button
                            variant={"text"}
                            sx={{
                                pointerEvents: "auto",
                                backgroundColor:
                                    theme.palette.mode == "light"
                                        ? theme.palette.neutral.main
                                        : "#121212",
                                color:
                                    theme.palette.mode == "light"
                                        ? theme.palette.neutral.dark
                                        : theme.palette.neutral.main,
                                borderTopRightRadius: 28,
                                borderBottomRightRadius: 28
                            }}
                        >
                            <AddIcon sx={{ fontSize: 20 }} />
                        </Button>
                    </Box>
                </Box>
            </Box>
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
