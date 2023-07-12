import { Avatar, Box, Divider, Typography } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import { useQuery } from "@apollo/client";

import { GET_LEADERBOARD } from "../../graphql/query";

const Leaderboard = () => {
    const { loading, error, data } = useQuery(GET_LEADERBOARD);

    if (loading || error) {
        return null;
    }

    console.log(data);

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} flexDirection={"column"}>
                {data.leaderboard.map((user: any, index: number) => {
                    const sumArray = (array: number[]) => array.reduce((a, b) => a + b, 0);
                    return (
                        <>
                            <Box display={"flex"} alignItems={"center"}>
                                <Avatar alt={user.firstName} src={user.profilePictureUrl} />
                                <Box ml={2} display={"flex"} flexDirection={"column"}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 400 }}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                    <Box display={"flex"}>
                                        <Typography
                                            sx={{ mt: -0.5, fontSize: 14, fontWeight: 400 }}
                                        >
                                            {sumArray(
                                                user.logbook.map(
                                                    (item: any) => item.verticalDistance
                                                )
                                            ).toFixed(0) + " ft"}
                                        </Typography>
                                        <Typography
                                            sx={{ ml: 1, mt: -0.5, fontSize: 14, fontWeight: 400 }}
                                        >
                                            {sumArray(
                                                user.logbook.map((item: any) => item.topSpeed)
                                            ).toFixed(0) + " mph"}
                                        </Typography>
                                        <Typography
                                            sx={{ ml: 1, mt: -0.5, fontSize: 14, fontWeight: 400 }}
                                        >
                                            {sumArray(
                                                user.logbook.map((item: any) => item.runCount)
                                            ).toFixed(0) + " runs"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {index !== data.leaderboard.length - 1 && <Divider sx={{ m: 1 }} />}
                        </>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Leaderboard;
