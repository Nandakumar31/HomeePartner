import { Text, TouchableOpacity, View } from "react-native";
import { Fonts } from "../../constent/Themes";
import colors from "../../utils/color";
import { Image } from "react-native";
import icons from "../../assets/Locationicons/icons";

export const AddressDetails = ({ title,locationName, info, buttonLabel, onPress ,onChatPress}: any) => (
    <View>
        <Text style={{
            color: '#4d4d4d', fontFamily: Fonts.RB,
            fontSize: 18, marginTop: 10
        }}>{title}</Text>
        <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                <Text style={{ color: '#4d4d4d', fontSize: 16, fontFamily: Fonts.RB, marginRight: 5 }}>{locationName}</Text>
                <Text style={{ color: '#4d4d4d', fontSize: 15, fontFamily: Fonts.RM }}>{info?.street}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                <Text style={{ color: '#4d4d4d', marginRight: 5, fontSize: 15, fontFamily: Fonts.RM }}>{info?.city}</Text>
                <Text style={{ color: '#4d4d4d', fontSize: 15, fontFamily: Fonts.RM }}>{info?.zip}</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={onPress}>
                <Text style={{
                    color: '#fff', fontFamily: Fonts.RM,
                    paddingHorizontal: 110, paddingVertical: 15, marginLeft: 10,
                    backgroundColor: colors.primary, textAlign: 'center', borderRadius: 10
                }}>{buttonLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onChatPress}>
                <Image source={icons.chatpng} style={{ width: 50, height: 50, marginRight: 10 }} />
            </TouchableOpacity>
        </View>
    </View>
);



