import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
    query GetLeaderboard {
        leaderboard {
            firstName
            lastName
            profilePictureUrl
            stats {
                verticalDistance(system: IMPERIAL)
            }
        }
    }
`;
