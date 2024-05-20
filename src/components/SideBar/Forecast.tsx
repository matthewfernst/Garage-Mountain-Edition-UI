import { Fragment } from "react";
import { Box, Divider, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { DateTime } from "luxon";

interface ForecastDay {
    date: string;
    conditions: string;
    forecasted_snow_day_in: string;
    temp_high_f: string;
    temp_low_f: string;
}

const Forecast = (props: { forecast: ForecastDay[] }) => {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            {props.forecast.map((day, index: number) => {
                let iconConditions = day.conditions.replaceAll("_", "-");
                if (iconConditions.includes("t-storms")) {
                    iconConditions = "thunderstorm";
                }
                return (
                    <Fragment key={index}>
                        <Box display={"flex"} alignItems={"center"} pt={1} pb={1}>
                            <Typography sx={{ width: 50, fontWeight: 500 }}>
                                {day.date && DateTime.fromISO(day.date).toFormat("EEE")}
                            </Typography>
                            <span
                                className={`wi wi-forecast-io-${iconConditions}`}
                                style={{ width: 50, fontSize: 16, display: "table" }}
                            />
                            <Box display={"flex"} alignItems={"center"} sx={{ width: 220 }}>
                                <Typography sx={{ paddingRight: 1.5 }}>
                                    {parseFloat(day.temp_low_f).toFixed(0)}°{" "}
                                </Typography>
                                <div style={{ width: 120 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={100}
                                        sx={{
                                            height: 5,
                                            borderRadius: 5,
                                            [`& .${linearProgressClasses.bar}`]: {
                                                borderRadius: 5,
                                                background: `linear-gradient(to right, ${
                                                    "hsl(" +
                                                    [
                                                        240 - 170 * (parseInt(day.temp_low_f) / 75),
                                                        "90%",
                                                        "50%"
                                                    ] +
                                                    ")"
                                                } 30%, ${
                                                    "hsl(" +
                                                    [
                                                        240 -
                                                            170 * (parseInt(day.temp_high_f) / 75),
                                                        "90%",
                                                        "50%"
                                                    ] +
                                                    ")"
                                                } 90%)`
                                            }
                                        }}
                                    />
                                </div>
                                <Typography sx={{ paddingLeft: 1.5 }}>
                                    {parseInt(day.temp_high_f)}°
                                </Typography>
                            </Box>
                            <Box alignItems={"center"} display={"flex"}>
                                <span
                                    className={`wi wi-forecast-io-snow`}
                                    style={{ marginRight: 6, fontSize: 16 }}
                                />
                                <Typography>{day.forecasted_snow_day_in}"</Typography>
                            </Box>
                        </Box>
                        {index !== props.forecast.length - 1 && <Divider flexItem />}
                    </Fragment>
                );
            })}
        </Box>
    );
};

export default Forecast;
