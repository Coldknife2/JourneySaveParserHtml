const [nodePath, filePath, sourceDirectory="./", targetDirectory="./"] = process.argv;
const fs = require('fs');
const path = require('path');

// https://gist.github.com/victorsollozzo/4134793 with some modifications
function recursiveFindByExtension(base, files, result) {
    files = files || fs.readdirSync(base)
    result = result || [];

    files.forEach(
        function (file) {
            var newbase = path.join(base, file)
            if (fs.statSync(newbase).isDirectory()) {
                result = recursiveFindByExtension(newbase, fs.readdirSync(newbase), result);
            }
            else {
                result.push(newbase);
            }
        }
    )
    return result;
}

function main()
{
    const directory = path.parse(sourceDirectory);
    console.log(directory);
    if (!fs.statSync(path.join(directory.dir, directory.base)).isDirectory())
    {
        console.log("The path given does not correspond to a folder");
        return;
    }

    const filesToTreat = recursiveFindByExtension(sourceDirectory);
    filesToTreat.forEach(filePath => {
        const parsedPath = path.parse(filePath);
        const newPath = path.join(targetDirectory, "/", parsedPath.name + parsedPath.ext);
        fs.copyFile( filePath, path.normalize(newPath), fs.constants.COPYFILE_FICLONE, () => {} );
    })
}

main();