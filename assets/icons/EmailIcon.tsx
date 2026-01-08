import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const EmailIcon = (props: SvgProps) => (
    <Svg
        width={23}
        height={20}
        viewBox="0 0 23 20"
        fill="none"
        {...props}
    >
        <Path
            d="M5.95837 18.4583H16.375C19.5 18.4583 21.5834 16.8958 21.5834 13.25V5.95833C21.5834 2.3125 19.5 0.75 16.375 0.75H5.95837C2.83337 0.75 0.750039 2.3125 0.750039 5.95833V13.25C0.750039 16.8958 2.83337 18.4583 5.95837 18.4583Z"
            stroke="black"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M4.11489 5.19666L9.89302 9.66155C10.6433 10.2412 11.6904 10.2412 12.4407 9.66155L18.2189 5.19666"
            stroke="black"
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </Svg>
);
export default EmailIcon;
