import { Box, Typography } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import ScaleIcon from "@mui/icons-material/Scale";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const TodaysWeather = (props: { todaysWeather: any; todaysSnow: any }) => {
    const todaysConditions = props.todaysWeather.Conditions.replace("_", "-");
    return (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} pl={2} pr={3}>
            <Box display={"flex"} alignItems={"center"} p={0.5}>
                <span
                    className={`wi wi-forecast-io-${todaysConditions}`}
                    style={{ fontSize: 40, fontWeight: 400, display: "table" }}
                />
                <Typography sx={{ pl: 2, fontWeight: 400, fontSize: 28 }}>
                    {parseInt(props.todaysWeather.TemperatureF)}°
                </Typography>
            </Box>
            <Box display={"flex"}>
                <Box display={"flex"} flexDirection={"column"}>
                    <Box display={"flex"} alignItems={"center"}>
                        <AirIcon sx={{ fontSize: 15, verticalAlign: "middle" }} />
                        <Typography sx={{ pl: 1 }}>
                            {props.todaysWeather.WindStrengthMph} mph{" "}
                            {props.todaysWeather.WindDirection}
                        </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                        <ScaleIcon sx={{ fontSize: 15, verticalAlign: "middle" }} />
                        <Typography sx={{ pl: 1 }}>{props.todaysWeather.PressureIN} in</Typography>
                    </Box>
                </Box>
                <Box display={"flex"} flexDirection={"column"} ml={2}>
                    <Box display={"flex"} alignItems={"center"}>
                        <WaterDropIcon sx={{ fontSize: 15, verticalAlign: "middle", mr: 1 }} />
                        <Typography>{props.todaysWeather.Humidity}%</Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                        <AcUnitIcon sx={{ fontSize: 15, verticalAlign: "middle", mr: 1 }} />
                        <Typography>{props.todaysSnow.forecasted_snow_day_in}"</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TodaysWeather;
