export function draw( points, colors,linePoints,rectPoint,tool) {
    if (tool === "Line" && points.length % 2 === 0) {
        let linepoints = linePoints;
        linepoints.push({ x1: points[0].x, y1: points[0].y, x2: points[1].x, y2: points[1].y, color: colors });
        return ([linepoints,rectPoint]);
    }
    if (tool === "Rectangle" && points.length % 2 === 0) {
        let w = points[1].x - points[0].x; if (w < 0) w = -w;
        let h = points[1].y - points[0].y; if (h < 0) h = -h;
        let rectPoints = rectPoint;
        //из низа в правый вверх
        if (points[1].y < points[0].y && points[0].x < points[1].x) {
            rectPoints.push({ x: points[0].x, y: points[1].y, w: w, h: h, color: colors });
            return ([linePoints,rectPoints]);
        }
        //из низа в левый вверх
        if (points[1].x < points[0].x && points[0].y > points[1].y) {
            rectPoints.push({ x: points[1].x, y: points[1].y, w: w, h: h, color: colors });
            return ([linePoints,rectPoints]);
        }
        //справа сверху влово вниз
        if (points[0].x > points[1].x && points[0].y < points[1].y) {
            rectPoints.push({ x: points[1].x, y: points[0].y, w: w, h: h, color: colors });
            return ([linePoints,rectPoints]);
        }
        //из вверха  в правый низ
        else {
            rectPoints.push({ x: points[0].x, y: points[0].y, w: w, h: h, color: colors });
            return ([linePoints,rectPoints]);
        }
    }
}