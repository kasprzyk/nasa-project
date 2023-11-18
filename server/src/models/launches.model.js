const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    flightNumber: 100,
    upcoming: true,
    success: true,
    customer: ['NASA', 'SpaceX'],
};
saveLaunch(launch);

//launches.set(launch.flightNumber, launch);

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planets found');
    }
    await launchesDatabase.updateOne(
        {
            flightNumber: launch.flightNumber,
        },
        launch,
        {
            upsert: true,
        },
    );
}

async function getAllLaunches() {
    return await launchesDatabase.find({}, {});
}

async function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found');
    }

    const newFlightNumber = (await getLatestFlightNumber()) + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'SpaceX'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch,
};
