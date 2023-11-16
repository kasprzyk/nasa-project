const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
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

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            upcoming: true,
            success: true,
            flightNumber: latestFlightNumber,
            customer: ['NASA', 'SpaceX'],
        }),
    );
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};
