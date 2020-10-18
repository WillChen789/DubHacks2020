// checkShoulderLevel takes in the x & y coordinates of the
// Left and Right shoulders as input, and returns True if
// the vertical level is within "threshold" of the calibrated
// level. Returns False otherwise.
export function checkShoulderDisplacement(x_L, y_L, x_R, y_R,
                                   x_L_opt, y_L_opt, x_R_opt, y_R_opt,
                                   threshold) {

    const deviation = Math.sqrt((x_L - x_L_opt) ** 2 + (y_L - y_L_opt) ** 2)
                      + Math.sqrt((x_R - x_R_opt) ** 2 + (y_R - y_R_opt) ** 2);

    return deviation < threshold;
}

// checkSlouching takes in the x coordinates of the Left and Right
// shoulders as input, and returns True if they are closer together
// when compared with the calibrated shoulder points.
// Returns False otherwise.
export function checkSlouching(x_L, x_R, x_L_opt, x_R_opt, threshold) {
    const diff = Math.abs(x_R - x_L);
    const optDiff = Math.abs(x_R_opt - x_L_opt);
    return diff >= optDiff - threshold;
}