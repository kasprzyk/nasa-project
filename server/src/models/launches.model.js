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

module.exports = {
    getAllLaunches,
    addNewLaunch,
};
