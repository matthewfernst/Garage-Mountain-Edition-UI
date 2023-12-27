import { Box, Typography } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import ScaleIcon from "@mui/icons-material/Scale";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const TodaysWeather = (props: { todaysWeather: any; todaysSnow: any }) => {
    const todaysConditions = props.todaysWeather.Conditions.replace("_", "-");

    const getConditionsInHumanReadableFormat = (condition: string) => {
        if (
            (condition.includes("partly") || condition.includes("mostly")) &&
            !condition.includes("-")
        ) {
            return (
                condition.substring(0, 1).toUpperCase() +
                condition.substring(1, condition.indexOf("y") + 1) +
                " " +
                condition.charAt(condition.indexOf("y") + 1).toUpperCase() +
                condition.substring(condition.indexOf("y") + 2, condition.length)
            );
        }
        let conditions = condition.split("-");
        for (let i = 0; i < conditions.length; i++) {
            conditions[i] = conditions[i].charAt(0).toUpperCase() + conditions[i].slice(1);
        }
        return conditions.join(" ");
    };

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} alignItems={"center"}>
                <Typography sx={{ fontWeight: 400, fontSize: 26 }}>
                    {parseInt(props.todaysWeather.TemperatureF)}°
                </Typography>
                <Typography sx={{ ml: 2, fontSize: 16 }}>
                    {getConditionsInHumanReadableFormat(todaysConditions)}
                </Typography>
            </Box>
            <Box mt={1} display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"} alignItems={"center"}>
                    <AirIcon style={{ fontSize: "15", verticalAlign: "middle" }} />
                    <Typography sx={{ pl: 2 }}>
                        {props.todaysWeather.WindStrengthMph} mph{" "}
                        {props.todaysWeather.WindDirection}
                    </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                    <ScaleIcon style={{ fontSize: "15", verticalAlign: "middle" }} />
                    <Typography sx={{ pl: 1 }}>
                        {props.todaysWeather.PressureIN} in of Mercury
                    </Typography>
                </Box>
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
