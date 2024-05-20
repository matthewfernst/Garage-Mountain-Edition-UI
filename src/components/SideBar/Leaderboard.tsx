import { Avatar, Box, Divider, Skeleton, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";

import { GET_LEADERBOARD } from "../../graphql/query";

const Leaderboard = () => {
    const { loading, error, data } = useQuery(GET_LEADERBOARD);
    if (loading || error) {
        return <Skeleton></Skeleton>;
    }

    const fieldsByIndex = [0, 1, 2].map((index: number) => {
        return data.leaderboard.map((user: any) => {
            const userWithSelectedStat = {
                ...user,
                stat: user.stats[indexToField(index)],
                unit: unitFromField(indexToField(index))
            };
            delete userWithSelectedStat.stats;
            return userWithSelectedStat;
        });
    });

    return (
        <Box display={"flex"} width={370} height={"100%"} sx={{ mb: 1, overflowX: "scroll" }}>
            {fieldsByIndex.map((field: any, index: number) => {
                return (
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        key={index}
                        ml={index !== 0 ? 3 : 0}
                        mr={index !== fieldsByIndex.length - 1 ? 3 : 0}
                    >
                        <Typography
                            sx={{ alignSelf: "center", pb: 2.5, fontSize: 17, fontWeight: 500 }}
                        >
                            {fieldToTitle(indexToField(index))} Leaderboard
                        </Typography>
                        <LeaderboardSection data={field} />
                    </Box>
                );
            })}
        </Box>
    );
};

const LeaderboardSection = (props: any) => {
    return (
        <Box display={"flex"} flexDirection={"column"} width={370}>
            {props.data.slice(0, 4).map((user: any, index: number) => {
                return (
                    <>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            key={index}
                            pl={1.5}
                            pr={1.5}
                        >
                            <Box display={"flex"} alignItems={"center"}>
                                <Typography sx={{ mr: 2, fontSize: 20, fontWeight: 500 }}>
                                    {index + 1}.
                                </Typography>
                                <Avatar
                                    alt={user.firstName}
                                    src={user.profilePictureUrl}
                                    sx={{ width: 35, height: 35 }}
                                />
                                <Typography sx={{ ml: 2, fontSize: 16 }}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </Box>

                            <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                                {`${Intl.NumberFormat("en-US", { style: "decimal" }).format(
                                    user.stat.toFixed(0)
                                )} ${user.unit}`}
                            </Typography>
                        </Box>
                        {index !== props.data.length - 1 && (
                            <Divider sx={{ m: 1 }} key={"divider" + index} />
                        )}
                    </>
                );
            })}
        </Box>
    );
};

const indexToField = (index: number) => {
    switch (index) {
        case 0:
            return "verticalDistance";
        case 1:
            return "topSpeed";
        case 2:
            return "runCount";
        default:
            return "verticalDistance";
    }
};

const fieldToTitle = (field: string) => {
    switch (field) {
        case "verticalDistance":
            return "Vertical Distance";
        case "topSpeed":
            return "Top Speed";
        case "runCount":
            return "Run Count";
        default:
            return "Vertical Distance";
    }
};

const unitFromField = (field: string) => {
    switch (field) {
        case "verticalDistance":
            return "ft";
        case "topSpeed":
            return "mph";
        case "runCount":
            return "runs";
        default:
            return "ft";
    }
};

export default Leaderboard;
