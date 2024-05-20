import { Box, Typography } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import ScaleIcon from "@mui/icons-material/Scale";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const TodaysWeather = (props: { todaysWeather: any; todaysSnow: any }) => {
    const todaysConditions = props.todaysWeather.Conditions.replace("_", "-");

    return (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box display={"flex"} alignItems={"center"}>
                <span
                    className={`wi wi-forecast-io-${todaysConditions}`}
                    style={{ fontSize: 38, display: "table" }}
                />
                <Typography sx={{ pl: 2, fontWeight: 400, fontSize: 35 }}>
                    {parseInt(props.todaysWeather.TemperatureF)}°
                </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} alignItems={"center"}>
                    <AirIcon style={{ fontSize: "15", verticalAlign: "middle" }} />
                    <Typography sx={{ pl: 1 }}>
                        {props.todaysWeather.WindStrengthMph} mph{" "}
                        {props.todaysWeather.WindDirection}
                    </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                    <ScaleIcon style={{ fontSize: "15", verticalAlign: "middle" }} />
                    <Typography sx={{ pl: 1 }}>{props.todaysWeather.PressureIN} in</Typography>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} alignItems={"center"}>
                    <AcUnitIcon style={{ fontSize: "15", verticalAlign: "middle" }} />
                    <Typography sx={{ pl: 1 }}>
                        {props.todaysSnow.forecasted_snow_day_in} "
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TodaysWeather;
