export default function() {
	return useState("theme", () => ({
		isLight: true
	}));
}
