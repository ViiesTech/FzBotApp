import { Dimensions } from "react-native";

const percentageCalculation = (max: number, val: number) => max * (val / 100);

const fontCalculation = (height: number, width: number, val: number) => {
    const widthDimension = height > width ? width : height;
    const aspectRatioBasedHeight = (16 / 9) * widthDimension;
    return percentageCalculation(Math.sqrt(Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2)), val);
};
export const responsiveFontSize = (f: number) => {
    const { height, width } = Dimensions.get("window");
    return fontCalculation(height, width, f);
};
export const responsiveHeight = (h: number) => {
    const { height } = Dimensions.get("window");
    return height * (h / 100)
}
export const responsiveWidth = (w: number) => {
    const { width } = Dimensions.get("window");
    return width * (w / 100)
}

export const AppColors = {
    BLACK: "#000000",
    WHITE: "#FFFFFF",
    BTNCOLOURS: "#114240",
    LIGHT_BTNCOLOURS: "#6e3357",
    LIGHTGRAY: "#D9D9D9",
    LIGHTESTGRAY: "#F0F3F6",
    BLUE: "#001AB0",
    LIGHT_BLUE: '#005DE0',
    GRAY: "#777777",
    CRNBERRY: "#ED4C5C",
    DARKGRAY: "#939393",
    PEACHCOLOUR: "#F7D794",
    INPUTBG: "#F5F5F5",
    BGCOLOURS: "#FDFDFD",
    PRIMARY: "#7DD6F7",
    THEME_COLOR: '#924dbf',
    RED_COLOR: '#F75555',
    DARK_RED: 'red',
    ThemeBlue: '#009CBD',
    Yellow: '#FF9C12',
    lightRed: '#FFD7D7',
    appBgColor: '#e7e4e4',
    hotPink: '#E74B90',
    royalBlue: '#2F6CAD',
    darkBlue: '#33434F',
    darkYellow: '#E55B13',
    lowGreen: '#587B58',
    lightGreen: '#2FB70D',
    inputBg: '#fafafa',
    inputBlur: '#f2f1fe',
    lightestBlue: '#CDECF3',
    themeColor: '#114240',
};