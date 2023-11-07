//const launches = require('./launches.mongo')
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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
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
