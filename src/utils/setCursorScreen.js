export function setCursorScreen(isVisible) {
    const canvas = document.querySelector('canvas');
    const body = document.querySelector('body');

    canvas.style.cursor = isVisible ? 'inherit' : 'none'
    body.style.cursor = isVisible ? 'inherit' : 'none'
    
}