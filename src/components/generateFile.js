export function generateCanvas(canvas) {
    canvas = canvas.split(' ');
    let arrCanvas = { w: canvas[1], h: canvas[2] };
    return (arrCanvas);
}

export function generateLines(line, lastLine) {
    line = line.split(' ');
    let arrLine = lastLine;
    arrLine.push({ x1: line[1], y1: line[2], x2: line[3], y2: line[4] });
    return (arrLine);
}

export function generateRect(rect, lastRest) {
    rect = rect.split(' ');
    let arrRect = lastRest;
    arrRect.push({ x: rect[1], y: rect[2], w: rect[3]-rect[1], h: rect[4]-rect[2] });
    return (arrRect);
}

export function generateFill(fill, lastFill) {
    fill = fill.split(' ');
    let arrfill = lastFill;
    arrfill.push({ x: fill[1], y: fill[2], c: fill[3] });
    return (arrfill);
}