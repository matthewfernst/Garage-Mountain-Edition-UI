import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
    query GetLeaderboard {
        leaderboard {
            id
            firstName
            lastName
            profilePictureUrl
            logbook {
                distance(system: IMPERIAL)
                topSpeed(system: IMPERIAL)
                verticalDistance(system: IMPERIAL)
                runCount
            }
        }
    }
`;
