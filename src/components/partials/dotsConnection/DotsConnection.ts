export enum ConnectStates {
  Connectionless = "Connectionless",
  Connecting = "Connecting",
  Connected = "Connected"
}
export enum UserEvents {
  NodeClicked,
  Connecting
}
export enum NodeTypes {
  Chicken = "chicken",
  Sparrow = "sparrow",
  Parrot = "parrot",
  Pet = "pet",
  Neighbor = "neighbor",
  Food = "food"
}
export interface Payloads {
  coord?: { x: number; y: number };
  endNodeIsStartNode?: boolean;
  userEvents?: UserEvents;
  nodeType?: NodeTypes;
}
