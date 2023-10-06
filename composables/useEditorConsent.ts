export default function() {
	const editorConsent = useCookie("editorConsent", {
		maxAge: 31536000,
		default: () => "false"
	});
	return editorConsent;
}
