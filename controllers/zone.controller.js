const createError = require("http-errors");
const zoneHelper = require("../helpers/zone.helper");

/* To fetch all zones from the .csv file */
exports.get = async (req, res, next) => {

    try {
        let zones = await zoneHelper.read();
        zones = zones.filter(item => item.points = JSON.parse(item.points));
        res.status(200).json({
            success: true,
            data: zones
        });
    } catch (error) {
        return next(error);
    }

}

/* To insert new zone to the .csv file */
exports.insert = async (req, res, next) => {

    const { name, points } = req.body;
    if (!name || !Array.isArray(points) || points.length !== 4) {
        return next(createError(400, "Invalid data"))
    }

    try {
        const zones = await zoneHelper.read();

        /* In case if we need serial ID we can use code below */
        /*
            const newId = zones.length ? Math.max(...zones.map((z) => parseInt(z.id))) + 1 : 1
        */

        const newId = Date.now();
        const newZone = { id: newId.toString(), name, points: JSON.stringify(points) };
        zones.push(newZone);
        await zoneHelper.write(zones);
        res.status(201).json({
            success: true,
            data: {...newZone, points}
        });
    } catch(error) {
        return next(error);
    }

}

/* To delete zone by id in .csv file */
exports.delete = async (req, res, next) => {

    const { id } = req.params;
    try {
        const zones = await zoneHelper.read();
        const filteredZones = zones.filter((zone) => zone.id !== id);
        if (!zones || !zones.length || zones.length === filteredZones.length) {
            return next(createError(404, `No zones were found with id ${id} to delete.`));
        }

        await zoneHelper.write(filteredZones);
        res.status(200).json({ success: true });
    } catch (error) {
        return next(error);
    }

}