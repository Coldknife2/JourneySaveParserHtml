// eslint-disable-next-line no-undef
const helper = new JourneyHelper(undefined);

const navbarElements = document.getElementsByClassName("flex-item");
for (let i=0; i<navbarElements.length; i++) {
	navbarElements[i].addEventListener("click", () => helper.preserveData());
}
window.addEventListener("beforeunload", () => helper.unload());
document.addEventListener("drop", (event) =>  helper.dragOverHandler(event));
document.addEventListener("dragover", (event) =>  helper.dragOverHandler(event));