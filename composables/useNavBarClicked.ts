export default function() {
	const navBarClicked = useCookie("navBarClicked", {
		maxAge: 31536000,
		default: () => "false"
	});
	return navBarClicked;
}
