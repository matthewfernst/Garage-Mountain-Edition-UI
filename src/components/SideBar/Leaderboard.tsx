import { Avatar, Box, Divider, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";

import { GET_LEADERBOARD } from "../../graphql/query";

const Leaderboard = () => {
    const { loading, error, data } = useQuery(GET_LEADERBOARD);

    if (loading || error) {
        return null;
    }

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} flexDirection={"column"}>
                {data.leaderboard.map((user: any, index: number) => {
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
                                            {user.stats.verticalDistance.toFixed(0) + " ft"}
                                        </Typography>
                                        <Typography
                                            sx={{ ml: 1, mt: -0.5, fontSize: 14, fontWeight: 400 }}
                                        >
                                            {user.stats.topSpeed.toFixed(0) + " mph"}
                                        </Typography>
                                        <Typography
                                            sx={{ ml: 1, mt: -0.5, fontSize: 14, fontWeight: 400 }}
                                        >
                                            {user.stats.runCount.toFixed(0) + " runs"}
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
