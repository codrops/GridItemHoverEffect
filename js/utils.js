/**
 * Preload images function
 * @param {string} selector - The CSS selector for the images to be preloaded. Default is 'img'.
 * @returns {Promise} A promise that resolves when all the images are loaded.
 */
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        // Use the imagesLoaded library to ensure all images are fully loaded.
        // This is particularly useful for getting accurate dimensions, avoiding layout shifts, etc.
        // `background: true` ensures background images are also loaded.
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

/**
 * Determines the direction from which the mouse entered an element.
 * 
 * @param {HTMLElement} element - The element to check against.
 * @param {number} lastX - The mouse's X-coordinate right before entering the element.
 * @param {number} lastY - The mouse's Y-coordinate right before entering the element.
 * @returns {string} - A string indicating the direction ("top", "right", "bottom", "left", or "unknown").
 */
const getMouseEnterDirection = (element, lastX, lastY) => {
    const { top, right, bottom, left } = element.getBoundingClientRect();
    
    if (lastY <= Math.floor(top)) return "top";
    if (lastY >= Math.floor(bottom)) return "bottom";
    if (lastX <= Math.floor(left)) return "left";
    if (lastX >= Math.floor(right)) return "right";
    
    return "unknown";
}

export {
    preloadImages,
    getMouseEnterDirection,
};
