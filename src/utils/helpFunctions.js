export const snowSize = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const startingXPosition = (width) => {
    return Math.floor(Math.random() * ((width - 10) - 10 + 1)) + 10;
}

export const yPositionRange = () => {
    return Math.floor(Math.random() * (-2000 - 10)) + 10;
}

export const speed = () => {
    return Math.floor(Math.random() * (6 - 1 + 1) + 1);
}