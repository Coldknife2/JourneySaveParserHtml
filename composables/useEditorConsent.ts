export default function() {
	const editorConsent = useCookie("editorConsent", { "maxAge": 31536000 });
	if (!editorConsent.value) {
		editorConsent.value = "false";
	}
	return editorConsent;
}
