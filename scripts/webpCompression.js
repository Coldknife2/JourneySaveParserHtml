const { exec } = require("child_process");
const fs = require("fs");
const fsWalk = require("walk");
const minimist = require("minimist");
const path = require("path");

function throwError(message, code) {
	console.log("\x1b[31m" + message.toString() + "\x1b[0m");
	process.exit(code);
}

function parseBool(str) {
	if (typeof str === "string") {
		str = str.toLowerCase();
		if (str === "true" || str === "false") {
			return str === "true";
		}
	}
	return Boolean(str);
}

function parsePath(key, name, def) {
	if (key in argv) {
		const temp = argv[key];
		if (typeof temp !== "string") {
			throwError(`${name} must be a string.`, 9);
		}
		return temp;
	}
	return def;
}

function parseExtension(ext) {
	if (ext) {
		if (typeof ext !== "string") {
			throwError("Extension must be a string.", 9);
		}
		ext = ext.toLowerCase();
		const extensions = ["png", "jpeg", "jpg", "tiff", "webp"];
		if (extensions.indexOf(ext) !== -1) {
			return ext;
		} else {
			throwError(`Invalid extension ${ext}. Valid extensions are ${extensions}.`, 9);
		}
	} else if (singleFile) {
		return path.basename(singleFile).split(".")[1];
	}
	return "png";
}

function parsePresets(set) {
	const presets = [
		"cwebp -m 6 -q 100 -mt -v",
		"cwebp -size 15000 -pass 10 -mt -v",
		"cwebp -size 50000 -pass 10 -mt -v"
	];
	if ("s" in argv) {
		set = argv["s"];
		if (typeof set === "number") {
			if (set < presets.length) {
				return presets[set];
			} else {
				throwError(`Preset ${set} is not configured, the highest preset is ${presets.length-1}.`, 9);
			}
		} else {
			return "cwebp" + set;
		}
	} else {
		return presets[0];
	}
}

function checkArguments(p, s, w) {
	let e;
	if (p && s) {
		e = "31mPath and file are mutually exclusive.";
	} else if (!p && !s) {
		e = "Either a path or a file need to be specified.";
	} else if (s && w) {
		e = "31mCannot walk a single file.";
	}
	if (e) {
		throwError(e, 9);
	}
}

function makeWebP(inFile, outFile) {
	const ext = path.basename(inFile).split(".")[1];
	if (ext === extension) {
		exec(preset + ` -o ${outFile}.webp ${inFile}`, (err, _, stderr) => {
			if (err) {
				throw err;
			}
			if (stderr) {
				console.log(stderr);
			}
			if (deleteInFile) {
				fs.unlink(inFile, (err => {
					if (err) {
						throw err;
					}
				}));
			}
		});
	}
}

function showHelp() {
	if (!("h" in argv)) {
		return;
	}
	console.log(`
	-h HELP      | Shows this help.
	-p PATH      | Converts all images in the top level folder of the path. Cannot be used with the -f option. (-p path/to/folder)
	-f FILE      | Converts the single image at the specified path. Cannot be used with the -p option. (-f path/to/file.png)
	-e EXTENSION | Specify the extension to use. Ignored when -f is used. Defaults to png. (-e jpg)
	-w WALK      | Use with -p, converts all image files in the folder and all subfolders. (-w 1)
	-d DELETE    | Deletes the input file after the conversion is complete. (-d 1)
	-s PRESET    | Uses a predefined preset via the submitted index or uses the custom preset with " -flags". The string must start with a space. (-s " -v -mt")
	`);
	process.exit(0);
}

const argv = minimist(process.argv.slice(2));
showHelp();
const walkDir = "w" in argv ? parseBool(argv["w"]) : false;
const deleteInFile = "d" in argv ? parseBool(argv["d"]) : false;
const pathToDir = parsePath("p", "Path (-p)", false);
const singleFile = parsePath("f", "File (-f)", false);
const preset = parsePresets();
const extension = parseExtension(argv["e"]);
checkArguments(pathToDir, singleFile, walkDir);

if (walkDir) {
	fsWalk.walk(pathToDir).on("file", function(root, fileStats, next) {
		const f = fileStats.name.split(".")[0];
		makeWebP(path.join(root, fileStats.name), path.join(root, f));
		next();
	});
} else if (singleFile) {
	if (fs.lstatSync(singleFile).isFile()) {
		const f = path.basename(singleFile).split(".")[0];
		makeWebP(singleFile, path.join(path.dirname(singleFile), f));
	}
} else {
	fs.readdir(pathToDir, (err, files) => {
		if (err) {
			throw err;
		}
		files.forEach(file => {
			if (fs.lstatSync(pathToDir + file).isFile()) {
				const f = file.split(".")[0];
				makeWebP(path.join(pathToDir, file), path.join(pathToDir, f));
			}
		});
	});
}
