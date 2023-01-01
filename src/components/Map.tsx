import { useEffect, useRef } from "react";

import { Box, Button, Divider, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import SpecialDays from "./Map/SpecialDays";
import callExternalAPIOnInterval from "../hooks/callExternalAPIOnInterval";

type Trail = {
    Difficulty: string;
    Galdes: string;
    Grooming: string;
    Moguls: string;
    MountainAreaName: string;
    Name: string;
    NightSkiing: string;
    Nordic: string;
    RunOfTheDay: string;
    SnowMaking: string;
    Status: string;
    StatusEnglish: string;
    TerrainParkFeatures: number;
    TerrainParkOnRun: string;
    Touring: string;
    TrailIcon: string;
    TrailSummary: string;
    UpdateDate: string;
};

const Map = () => {
    const theme = useTheme();
    const { VITE_TIME_INTERVAL, VITE_SKI_RESORT_ID } = import.meta.env;
    const mountainData = callExternalAPIOnInterval(
        VITE_TIME_INTERVAL,
        `https://mtnpowder.com/feed?resortId=${VITE_SKI_RESORT_ID}`
    )?.MountainAreas[0]?.Trails;

    if (!mountainData) {
        return null;
    }

    const getNightTrails = () => {
        const nightTrails: string[] = [];
        mountainData.forEach((trail: Trail) => {
            if (trail.NightSkiing == "Yes") {
                nightTrails.push(trail.Name.toLowerCase());
            }
        });
        return nightTrails;
    };

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
                <Box pt={2} pr={2} alignSelf={"end"}>
                    <SpecialDays />
                </Box>
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
            <SteamboatInteractiveMap nightTrailsOpen={getNightTrails()} />
        </Box>
    );
};

const SteamboatInteractiveMap = (props: { nightTrailsOpen: string[] }) => {
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
                        iframeDocument.getElementById("menu")
                    ].forEach((element) => element?.remove());
                    const trailParent = iframeDocument.getElementById("TRAIL-LINES");
                    const trailChildren = trailParent?.children;
                    const trailIds = Array.from(trailChildren!).map((child) => child.id);
                    console.log(props.nightTrailsOpen);
                    trailIds.forEach((trailId) => {
                        const trail = iframeDocument.getElementById(trailId);
                        if (trail) {
                            const trailName = trailId.replace("_", " ").split("-")[1].toLowerCase();
                            console.log(trailName);
                            if (!props.nightTrailsOpen.includes(trailName)) {
                                console.log(trail);
                                trail.remove();
                            }
                        }
                    });

                    const liftParent = iframeDocument.getElementById("LIFTS");
                    const liftChildren = liftParent?.children;
                    const liftIds = Array.from(liftChildren!).map((child) => child.id);
                    liftIds.forEach((liftId) => {
                        const lift = iframeDocument.getElementById(liftId);
                        if (lift) {
                            if (liftId !== "lift-Christie_Peak_Express") {
                                lift.remove();
                            }
                        }
                    });

                    const map = iframeDocument.getElementById("_Image1");
                    if (map) {
                        map.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "xlink:href",
                            "https://raw.githubusercontent.com/matthewfernst/Mountain-UI/main/src/assets/images/SteamboatDarkMode.jpg"
                        );
                    }
                }
            }
        }, 5000);
        return () => clearTimeout(iframeReactLoadDelayTimeout);
    }, [mapRef]);

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
