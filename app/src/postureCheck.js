// Leaning sideways: takes in x and y coordinates of eyes along with avg, returns true if
// the tilt is within the threshold, false otherwise. Takes a smaller threshold than checkShoulders.
export function sideFaceTilt(x_Leye, y_Leye, x_Reye, y_Reye, x_Leye_opt, y_Leye_opt, x_Reye_opt, y_Reye_opt, threshold) {

    const deviation = Math.sqrt((x_Leye - x_Leye_opt) ** 2 + (y_Leye - y_Leye_opt) ** 2)
                        + Math.sqrt((x_Reye - x_Reye_opt) ** 2 + (y_Reye - y_Reye_opt) ** 2);

    return deviation < threshold;
}

// Leaning forwards or backwards: takes y coordinates of nose and eyes along with avg, returns true if
// the distance between nose and eyes is within the threshold, false otherwise.
export function fbFaceTilt(y_nose, y_Leye, y_Reye, y_nose_opt, y_Leye_opt, y_Reye_opt, threshold) {
    const defaultDistance = ((y_Leye_opt + y_Reye_opt) / 2) - y_nose_opt;
    
    const currentDistance = ((y_Leye + y_Reye) / 2) - y_nose;

    const deviation = Math.abs(defaultDistance - currentDistance);
    // Positive deviation means leaning forwards, negative deviation means leanign backwards
    // Absolute value to include both.
    return deviation < threshold;
}