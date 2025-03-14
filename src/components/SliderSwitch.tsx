import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-switch';

const SliderSwitch = ({ setIsOnline, isOnline }: any) => {
    const toggleSwitch = () => setIsOnline(previousState => !previousState);
    return (
            <Switch
                onValueChange={setIsOnline}
                value={isOnline}
                barHeight={20}
                switchWidthMultiplier={2.5}
                circleSize={27}
                circleBorderWidth={0.5}
                circleActiveColor='#E2FF88'
                inActiveText='Offline'
                inactiveTextStyle={{ color: '#fff', fontSize: 12, }}
                backgroundActive='#fff'
                backgroundInactive='red'
                activeText='Online'
                containerStyle={{marginVertical:15,marginLeft:25}}
                activeTextStyle={{ color: '#03894E', fontSize: 12, }}
            />

   

    )

}

export default SliderSwitch

const styles = StyleSheet.create({


});
