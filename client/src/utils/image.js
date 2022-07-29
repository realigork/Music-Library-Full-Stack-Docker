export const getRandomImagePath = (width, height) => {
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const rndInt = randomIntFromInterval(1, 50);
    return `https://picsum.photos/id/${rndInt}/${width}/${height}`;
};
