export default function() {
	const navBarClicked = useCookie("navBarClicked", { "maxAge": 31536000 });
	if (!navBarClicked.value) {
		navBarClicked.value = "false";
	}
	return navBarClicked;
}
