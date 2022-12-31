import { useState } from "react";

import {
    Alert,
    AlertTitle,
    Badge,
    Box,
    Collapse,
    IconButton,
    Popover,
    Typography
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import CloseIcon from "@mui/icons-material/Close";

import callExternalAPIOnInterval from "../../hooks/callExternalAPIOnInterval";

const ImportantAlerts = () => {
    const { VITE_TIME_INTERVAL, VITE_SKI_RESORT_ID, VITE_NATIONAL_WEATHER_SERVICE_ZONE } =
        import.meta.env;

    const [showNationalWeatherAlert, setShowNationalWeatherAlert] = useState<boolean>(false);
    const [showSnowPatrolAlert, setShowSnowPatrolAlert] = useState<boolean>(false);

    const [nationalWeatherServiceViewed, setNationalWeatherServiceViewed] =
        useState<boolean>(false);
    const [snowPatrolViewed, setSnowPatrolViewed] = useState<boolean>(false);

    const resortData = callExternalAPIOnInterval(
        VITE_TIME_INTERVAL,
        `https://mtnpowder.com/feed?resortId=${VITE_SKI_RESORT_ID}`
    );

    const nationalWeatherServiceAlert = callExternalAPIOnInterval(
        VITE_TIME_INTERVAL,
        `https://api.weather.gov/alerts/active?zone=${VITE_NATIONAL_WEATHER_SERVICE_ZONE}`
    )?.features[0]?.properties?.description;

    const snowPatrolAlert: string = resortData?.SnowReport?.Alert;

    if (snowPatrolAlert === "--" && !nationalWeatherServiceAlert) {
        return null;
    }

    const getBadgeNumber = () => {
        let number: number = 0;
        if (nationalWeatherServiceAlert && !nationalWeatherServiceViewed) {
            number++;
        }
        if (snowPatrolAlert !== "--" && !snowPatrolViewed) {
            number++;
        }
        return number;
    };

    if (!showNationalWeatherAlert && !showSnowPatrolAlert) {
        return (
            <IconButton
                edge={"end"}
                color={"inherit"}
                onClick={() => {
                    nationalWeatherServiceAlert && setShowNationalWeatherAlert(true);
                    snowPatrolAlert !== "--" && setShowSnowPatrolAlert(true);
                }}
            >
                <Badge
                    badgeContent={getBadgeNumber()}
                    color={"error"}
                    sx={{ "& .MuiBadge-badge": { fontSize: 11, height: 18, minWidth: 18 } }}
                >
                    <ReportIcon sx={{ fontSize: 24 }} />
                </Badge>
            </IconButton>
        );
    }

    return (
        <Box>
            <Box>
                {nationalWeatherServiceAlert && (
                    <CollapsableAlert
                        severity={"warning"}
                        showAlert={showNationalWeatherAlert}
                        setShowAlert={setShowNationalWeatherAlert}
                        title={"National Weather Service Alert"}
                        message={nationalWeatherServiceAlert}
                        setDidView={setNationalWeatherServiceViewed}
                    />
                )}
            </Box>
            <Box>
                {snowPatrolAlert && snowPatrolAlert !== "--" && (
                    <CollapsableAlert
                        severity={"warning"}
                        showAlert={showSnowPatrolAlert}
                        setShowAlert={setShowSnowPatrolAlert}
                        title={"Snow Patrol Alert"}
                        message={snowPatrolAlert}
                        setDidView={setSnowPatrolViewed}
                    />
                )}
            </Box>
        </Box>
    );
};

const CollapsableAlert = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <Popover
            open={props.showAlert}
            anchorEl={anchorEl}
            onClose={() => {
                setAnchorEl(null);
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
        >
            <Collapse in={props.showAlert} sx={{ width: 500, pointerEvents: "auto" }}>
                <Alert
                    severity={props.severity}
                    onChange={() => {
                        props.setShowAlert(true);
                    }}
                    color={props.severity === "warning" ? "error" : "info"}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                props.setShowAlert(false);
                                props.setDidView(true);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>{props.title}</AlertTitle>
                    {props.message.split("*").map((i: string) => {
                        return (
                            <>
                                <Typography fontSize={14}>{i}</Typography>
                                <br />
                            </>
                        );
                    })}
                </Alert>
            </Collapse>
        </Popover>
    );
};

export default ImportantAlerts;
