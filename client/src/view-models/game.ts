import type GameFormat from "./gameFormat";
import type Ticket from "@/view-models/tickets";
import type Player from "./player";

export default interface Game {
    players: Player[];
    tickets: Ticket[];
    gameType: GameFormat;
}