<template>
	<div class="container">
		<div class="info">
			<details open>
				<summary>Finding the Save.bin</summary>
				Your SAVE.BIN can be found at two locations:
				<ul class="enableSelection">
					<li>%localappdata%\Annapurna Interactive\Journey\Steam</li>
					<li>YOUR_STEAM_PATH\userdata\YOUR_STEAM_ID\638230\remote</li>
				</ul>
				The easiest to find is the first one, press the "Windows"-Key together with the "R"-Key and a little window titled "Run" will appear. <br />
				Paste "<span class="enableSelection">%localappdata%\Annapurna Interactive\Journey\Steam</span>" (without quotation marks) into it and press "Enter". <br />
				This will open a folder containing the SAVE.BIN file. <br />
				<br />
				For the other file, find your Steam install path and navigate to the "userdata" directory. <br />
				Here you will find one or more folders (depending on how many users have signed in on this pc), each named with a unique number. <br />
				To find yours, you can use services like <a href="https://www.steamidfinder.com/" target="_blank">Steam ID Finder</a>. <br />
				Once you have found your folder, navigate to "638230/remote" and you will again find a SAVE.BIN file.
			</details>
			<details open>
				<summary>How to use the parser</summary>
				Now that you've found your SAVE.BIN file, drag-and-drop it into the website. <br />
				You can alternatively also click the drop zone and navigate to the file in the file picker that pops up. <br />
				The parser will now present you with the results. <br />
				If you want to change your save file, you can just drop in a new one. <br />
			</details>
			<details open>
				<summary>How to use the editor</summary>
				Drop in your SAVE.BIN like you did for the parser. <br />
				Click on one of the four sections to edit that value, change it to whatever you like and click "Back" when you're done. <br />
				After you have set up everything to your liking, click "Download". <br />
				You will now have a file called "SAVE.BIN" in your Downloads folder, go to both paths mentioned above and replace the SAVE.BINs there with your newly downloaded one. <br />
				Make a backup copy of your old save if you still need it. <br />
				You will need to disable Cloud Saves on Steam for this to work (right-click Journey > Properties > General > Cloud Saves). <br />
				Now start Journey and press "Continue" to play.
			</details>
			<details open>
				<summary>I still need help</summary>
				Check the <a href="https://journey.fandom.com/wiki/Guide:_PC_version_-_Companions_Met_Along_the_Way_Problems#Steam_-_SAVE.BIN" target="_blank">wiki</a>. <br />
				Come join the <a href="https://discord.gg/83QunNN" target="_blanK">Journey Discord</a> and ask your question in #tech-support. <br />
				If necessary ping @arckoor.
			</details>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
	font-size: var(--font-size--subscript);
}

.info {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	margin: 100px 100px 20px 100px;
}

details {
	margin-bottom: 40px;
}

summary {
	font-size: var(	--font-size--section);
}

a,
a:visited {
	color: var(--color-text);
	text-decoration: underline;
	padding: 0 2px;
}
</style>
