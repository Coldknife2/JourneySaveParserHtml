export function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function squarePolynomial(x: number, a=1, b=1, c=0) {
	return a*x**2+b*x+c;
}

// https://stackoverflow.com/a/11410079
export function clamp(num: number, min: number, max: number) {
	return num <= min ? min : num >= max ? max : num;
}

// https://stackoverflow.com/a/46545530/12203337
export function shuffle(a: Array<number>) {
	return a.map(v => ({ v, sort: Math.random() })).sort((q, s) => q.sort - s.sort).map(({ v }) => v);
}
