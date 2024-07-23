const fs = require("fs");
const path = require("path");
const fastCsv = require("fast-csv");
const csvFilePath = path.join(__dirname, "..", "zone.csv");
const csvParser = require("csv-parser");

/* Function to check if the .csv file exists; if not, create it */
const checkAndCreateCsvFile = () => new Promise((resolve, reject) => {

    try {
        if (!fs.existsSync(csvFilePath)) {
            const headers = ["id", "name", "points"];
            const ws = fs.createWriteStream(csvFilePath);
            fastCsv.write([], { headers })
                .pipe(ws)
                .on("finish", resolve)
                .on("error", (err) => reject(err));
        }

        return resolve();
    } catch (err) {
        return reject(err);
    }

});

/* Function to write data to the .csv file */
exports.write = (zones) => new Promise(async (resolve, reject) => {

    try {
        await checkAndCreateCsvFile();
        const ws = fs.createWriteStream(csvFilePath);
        fastCsv
            .write(zones, { headers: true })
            .pipe(ws)
            .on("finish", resolve)
            .on("error", (err) => reject(err));
    } catch (err) {
        return reject(err);
    }

});

/* Function to read data from the .csv file */
exports.read = () => new Promise(async (resolve, reject) => {

    try {
        if (!fs.existsSync(csvFilePath)) {
            return resolve([]);
        }

        const zones = [];
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on("data", (row) => zones.push(row))
            .on("end", () => resolve(zones))
            .on("error", (err) => reject(err));
    } catch (err) {
        return reject(err);
    }

});