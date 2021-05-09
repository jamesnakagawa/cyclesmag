export function initHorizontalScroll(selector) {
    let horizontalDiv = document.querySelector(selector);

    function scrollListener(event) {
        var left;
        if (horizontalDiv.style.left) {
            left = parseInt(horizontalDiv.style.left, 10);
        } else {
            left = 0;
        }
        let width = parseInt(horizontalDiv.style.width, 10);
        // console.log(horizontalDiv.style.width, width);
        let leftBoundary = event.deltaY + left;
        leftBoundary = Math.min(leftBoundary, 0);
        leftBoundary = Math.max(leftBoundary, -(width - window.innerWidth));
        horizontalDiv.style.left = leftBoundary + 'px';
    // console.log(horizontalDiv.style.left, left);
    }

    horizontalDiv.addEventListener('wheel', scrollListener); //fxn is a callback when given to another fxn
}