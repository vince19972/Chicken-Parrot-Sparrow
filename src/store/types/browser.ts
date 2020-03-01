export enum CommitKey {
	Resize = 'resize',
	Scroll = 'scroll',
	Mouse = 'mouse'
}

export interface MouseShape {
	x: number,
	y: number
}

interface States {
	width: number,
	height: number,
	ratio: number,
	position: number,
	mouse: MouseShape,
	screen: {
		large: number
		medium: number
		desktop: number
		small: number
		tablet: number
		mobile: number
	}
}

export interface ResizeState {
	width: number
	height: number
	ratio: number
}
export interface ScrollState {
	position: number
}
export interface MouseState {
	mouse: MouseShape
}