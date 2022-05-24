const [, , sourceDirectory="./", targetDirectory="./"] = process.argv;
const fs = require("fs");
const path = require("path");

// https://gist.github.com/victorsollozzo/4134793 with some modifications
function recursiveFindByExtension(base, files=fs.readdirSync(base), result=[]) {
	files.forEach(
		function(file) {
			const newBase = path.join(base, file);
			if (fs.statSync(newBase).isDirectory()) {
				result = recursiveFindByExtension(newBase, fs.readdirSync(newBase), result);
			} else {
				result.push(newBase);
			}
		}
	);
	return result;
}

function main() {
	const directory = path.parse(sourceDirectory);
	console.log(directory);
	if (!fs.statSync(path.join(directory.dir, directory.base)).isDirectory()) {
		console.log("The path given does not correspond to a folder");
		return;
	}

	const filesToTreat = recursiveFindByExtension(sourceDirectory);
	filesToTreat.forEach(filePath => {
		const parsedPath = path.parse(filePath);
		const newPath = path.join(targetDirectory, "/", parsedPath.name + parsedPath.ext);
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		fs.copyFile( filePath, path.normalize(newPath), fs.constants.COPYFILE_FICLONE, () => {} );
	});
}

main();
