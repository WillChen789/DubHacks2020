export function faceTilt(x_nose, y_nose, x_Leye, y_Leye, x_Reye, y_Reye) {
    if(y_Leye > (y_Reye + 10) || y_Reye > (y_Leye + 10)) {
        // Leaning sideways
        return false;
    }
    else if(y_nose > (y_Leye + 10) || y_nose > (y_Reye + 10)) {
        // Leaning forwards
        return false;
    }
    else if(y_nose < (y_Leye + 3) || y_nose < (y_Reye + 3)) {
        // Leaning backwards
        return false;
    }
    else if(x_nose < (x_Leye + 1) || x_nose < (x_Reye + 1)) {
        // Leaning sideways
        return false;
    }
    return true;
}