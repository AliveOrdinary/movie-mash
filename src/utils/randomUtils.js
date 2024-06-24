//  Generates a random IMDb movie ID within a valid range.
function generateRandomIMDbID(start = 0, end = 9999999) {
    const min = Math.ceil(start);
    const max = Math.floor(end);

    // Generate a random number within the range
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convert the random number to a 7-digit string with leading zeros
    const randomID = randomNumber.toString().padStart(7, '0');

    // Prepend "tt" to the random ID to form a valid IMDb movie ID
    const imdbID = `tt${randomID}`;

    return imdbID;
}

// Generates an array of random IMDb movie IDs.

function generateRandomIMDbIDs(count, start = 0, end = 9999999) {
    const randomIDs = [];

    for (let i = 0; i < count; i++) {
        const randomID = generateRandomIMDbID(start, end);
        randomIDs.push(randomID);
    }

    return randomIDs;
}

export { generateRandomIMDbID, generateRandomIMDbIDs };