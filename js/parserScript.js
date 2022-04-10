
// eslint-disable-next-line no-undef
const helper = new JourneyHelper(setupCall);
helper.attachGeneralListeners();

const resultZone = document.getElementById("resultZone");
const companionsLeft = document.getElementById("companionsLeft");
const companionsRight = document.getElementById("companionsRight");
const cmatw = document.getElementById("cmatw");

const olderCompanionsLeft = document.getElementById("olderCompanionsLeft");
const olderCompanionsRight = document.getElementById("olderCompanionsRight");
const cmatwPast = document.getElementById("cmatwPast");

function setupCall() {
	displayCompanions();
}

function displayCompanions() {
	const baseOffset = 0x19a8; // hex 19A8 thanks Journey wiki
	const symbolOffset = 0x1200;
	const companionOffset = 0x1588;

	const companionNumber = helper.readData("uint8", companionOffset);

	if (companionNumber < 1) {
		cmatw.hidden = true;
	}

	let olderCompanionsNumber = 0;

	for (let i = 0; i < 8; i++) { // Let's read those 8 players entries
		const tempNameBuffer = helper.readData("uint8", baseOffset+32*i, 24);
		const nameBuffer = tempNameBuffer.subarray(0, tempNameBuffer.indexOf(0x00));
		const name = new TextDecoder().decode(nameBuffer);

		const steamIdV3int32 = helper.readData("uint32", baseOffset+32*i+24);
		const steamIdV3 = `[U:1:${steamIdV3int32}]`;
		const safeHtmlSteamIdV3 = encodeURIComponent(steamIdV3);
		const steamLink = "https://steamcommunity.com/profiles/" + safeHtmlSteamIdV3;

		const symbolNumber = helper.readData("uint8", symbolOffset+60*i);

		const hexUnicodeGlyphRepresentation = (symbolNumber + 1).toString(16).padStart(2, "0");

		const container = document.createElement("a");
		container.className = "container hov";
		container.href = steamLink;
		container.target = "_blank";

		const div = document.createElement("div");
		div.innerText = name;
		div.className = "playerDisplay";

		const symbol = document.createElement("div");
		symbol.className = "glyphDisplay";
		symbol.innerText = String.fromCharCode("0xE0" + hexUnicodeGlyphRepresentation);
		container.appendChild(symbol);
		container.appendChild(div);

		if (steamIdV3int32 != 0) {
			if (i < companionNumber) {
				if (i/4 < 1) {
					companionsLeft.appendChild(container);
				} else {
					companionsRight.appendChild(container);
				}
			} else {
				olderCompanionsNumber++;
				if ((i-companionNumber)/4 < 1) {
					olderCompanionsLeft.appendChild(container);
				} else {
					olderCompanionsRight.appendChild(container);
				}
			}
		} else {
			break;
		}
		console.log(`
iteration: ${i}
baseOffset: ${baseOffset+32*i}
idOffset: ${baseOffset+32*i+24}
symbolOffset: ${symbolOffset+60*i}

name: ${name}
steamLink: ${steamLink}
steamID3: ${steamIdV3}
symbol: ${symbol}

`);
	}
	if (olderCompanionsNumber === 0) {
		cmatwPast.hidden = true;
	}
	helper.changeVisibility([helper.dropZoneVisibilityToggler, resultZone]);
}