export enum ConnectStates {
  Connectionless = "Connectionless",
  Connecting = "Connecting",
  Connected = "Connected",
}
export enum PairingStates {
  Paired = "paired",
  NotPaired = "notPaired",
  Pending = "pending",
}
export enum UserEvents {
  NodeClicked,
  Connecting,
}
export enum NodeTypes {
  Chicken = "chicken",
  Sparrow = "sparrow",
  Parrot = "parrot",
  Pet = "pet",
  Neighbor = "neighbor",
  Food = "food",
}
export interface Payloads {
  coord?: { x: number; y: number };
  endNodeIsStartNode?: boolean;
  userEvents?: UserEvents;
  nodeType?: NodeTypes;
}

export interface LocalStates {
  connect: ConnectStates;
  startNode: NodeTypes | null;
  endNode: NodeTypes | null;
  pairingState: PairingStates;
  dynamicTextTarget: string | null;
  hoverNodeTarget: NodeTypes | null;
}

export function checkPairingState(
  startNode: NodeTypes | null,
  endNodeType: NodeTypes | null
): PairingStates {
  let state = PairingStates.NotPaired;

  switch (startNode) {
    case NodeTypes.Chicken:
      if (endNodeType === NodeTypes.Food) {
        state = PairingStates.Paired;
      }
      break;
    case NodeTypes.Food:
      if (endNodeType === NodeTypes.Chicken) {
        state = PairingStates.Paired;
      }
      break;
    case NodeTypes.Sparrow:
      if (endNodeType === NodeTypes.Neighbor) {
        state = PairingStates.Paired;
      }
      break;
    case NodeTypes.Neighbor:
      if (endNodeType === NodeTypes.Sparrow) {
        state = PairingStates.Paired;
      }
      break;
    case NodeTypes.Parrot:
      if (endNodeType === NodeTypes.Pet) {
        state = PairingStates.Paired;
      }
      break;
    case NodeTypes.Pet:
      if (endNodeType === NodeTypes.Parrot) {
        state = PairingStates.Paired;
      }
      break;
    default:
      return PairingStates.NotPaired;
  }

  return state;
}

export function getOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const { x, y, width, height } = rect;
  const fmtRectX = x + width / 2;
  const fmtRectY = y + height / 2;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { x: fmtRectX + scrollLeft, y: fmtRectY + scrollTop };
}

export const gifUrls = {
  chicken: ["https://media.giphy.com/media/gpMP6Aim0BD3i/giphy.gif"],
  food: ["https://media.giphy.com/media/jqwk5Jxh8UcbMZbxK7/giphy.gif"],
  sparrow: ["https://media.giphy.com/media/RksrTsDMQJ29O/giphy.gif"],
  neighbor: ["https://media.giphy.com/media/PsLIN8YlKy4rS/giphy.gif"],
  parrot: ["https://media.giphy.com/media/Ddm5ER7Z45sIM/giphy.gif"],
  pet: ["https://media.giphy.com/media/fYleqGp1DQvWoYC3AZ/giphy.gif"],
};
