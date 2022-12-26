import { Box, Paper, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import specialDays, { SpecialDay } from "../../SpecialDays";

const SpecialDaysCard = () => {
    const { VITE_TIME_INTERVAL } = import.meta.env;
    const [specialDay, setSpecialDay] = useState<SpecialDay>();

    useEffect(() => {
        const getSpecialDay = async () => {
            const specialDay = specialDays.find((day) => DateTime.now().hasSame(day.date, "day"));
            if (specialDay) {
                setSpecialDay(specialDay);
            }
        };

        const interval = setInterval(getSpecialDay, VITE_TIME_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    if (!specialDay) return null;
    return (
        <Paper style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Box display={"flex"} justifyContent={"center"} style={{ width: "100%" }} mb={2}>
                <Typography sx={{ fontSize: 30, mr: 2 }}>{specialDay.emoji}</Typography>
                <Typography style={{ fontWeight: 500, fontSize: 30, textAlign: "center" }}>
                    {specialDay.text}
                </Typography>
                <Typography sx={{ fontSize: 30, ml: 2 }}>{specialDay.emoji}</Typography>
            </Box>
        </Paper>
    );
};

export default SpecialDaysCard;
