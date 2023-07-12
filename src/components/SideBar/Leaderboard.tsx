import { Avatar, Box, Divider, Typography } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import { useQuery } from "@apollo/client";

import { GET_LEADERBOARD } from "../../graphql/query";

const Leaderboard = () => {
    const { loading, error, data } = useQuery(GET_LEADERBOARD);
    console.log(loading, error, data);

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} flexDirection={"column"}>
                {data.leaderboard.map((user: any, index: number) => {
                    return (
                        <>
                            <Box display={"flex"} alignItems={"center"}>
                                <Avatar alt="Matthew Ernst" src="/static/images/avatar/1.jpg" />
                                <Box ml={2} display={"flex"} flexDirection={"column"}>
                                    <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                    <Typography sx={{ mt: -0.5, fontSize: 15, fontWeight: 400 }}>
                                        10,200 ft
                                    </Typography>
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
