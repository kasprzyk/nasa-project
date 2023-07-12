const launches = new Map();

const launch = {
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    flightNumber: 100,
    customer: ['NASA', 'SpaceX'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
    launches,
};
