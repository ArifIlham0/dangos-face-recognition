import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const FilterIcon = ({color = "black", ...props}: SvgProps) => (
    <Svg
        width={17}
        height={12}
        viewBox="0 0 17 12"
        fill="none"
        {...props}
    >
    <Path
        d="M0.810059 0.809998H15.8101M3.31006 5.81H13.3101M6.31006 10.81H10.3101"
        stroke={color}
        strokeWidth={1.62}
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    </Svg>
);
export default FilterIcon;
