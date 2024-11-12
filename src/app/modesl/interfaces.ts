import { messageDirections } from "./enums";

export interface IChatMessage {
  text: string;
  date: string;
  userId: string;
  direction: messageDirections;
}
