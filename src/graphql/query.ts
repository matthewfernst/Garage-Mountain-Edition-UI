import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
    query GetLeaderboard {
        leaderboard(limit: 3) {
            id
            firstName
            lastName
            profilePictureUrl
            logbook {
                distance
                topSpeed
                verticalDistance
            }
        }
    }
`;
