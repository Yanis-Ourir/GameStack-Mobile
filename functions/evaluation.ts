import { PlatformsProps, StatusProps } from "@/components/game/GameReview";
import { UserProps } from "./user";

export type EvaluationProps = {
    id: number;
    rating: number;
    description: string;
    game_time: string;
    status: StatusProps;
    platforms: PlatformsProps[];
    user: UserProps;
}