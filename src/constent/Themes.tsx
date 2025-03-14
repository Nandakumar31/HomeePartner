import { Dimensions } from "react-native"

export const Colors = {
    PrimaryColor: '#03894E'
}

export const Fonts = {
    RM: 'Roboto-Medium',
    RB: 'Roboto-Bold'
}

const { width, height } = Dimensions.get('screen')
export const Screen = {
    w: width,
    h: height
}