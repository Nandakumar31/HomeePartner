import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { List, Menu } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height }: any = Dimensions.get('screen')

const MenuInputDropdown = ({
    title,
    placeholder,
    inputValue,
    onInputChange,
    onAddPress,
    onDropdownPress,
    dropdownItems,
    onDropdownItemPress,
    showDropdown,
    setShowDropdown,
    Itemdelete,
    editItems,
    editable
}: any) => {



    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    // console.log(dropdownItems, 'kkkkk');






    return (
        <View style={styles.contentContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.nameText}>{title}</Text>

                {editItems == null && <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => onAddPress(title)}>
                        <Text style={{ color: '#03894E', fontFamily: 'Poppins-Regular', paddingRight: 20 }}>Add</Text>
                    </TouchableOpacity>
                </View>}
            </View>


            <Menu
                visible={showDropdown}
                onDismiss={toggleDropdown}
                anchor={<>

                    <View style={styles.container}>
                        <TextInput
                            placeholder={placeholder}
                            placeholderTextColor="#4d4d4d"
                            value={inputValue?.length > 17 ? `${inputValue.slice(0, 18)}...` : inputValue}
                            onChangeText={(text) => onInputChange(text, title)}
                            onBlur={() => Keyboard.dismiss()}
                            style={styles.textInput}
                            editable={editable}
                        />
                        <TouchableOpacity onPress={() => { toggleDropdown(); onDropdownPress(title); }}>
                            <View style={styles.iconContainer}>
                                <AntDesign
                                    name='down'
                                    color={'#707070'}
                                    size={22}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </>}
                contentStyle={{
                    backgroundColor: '#fff', height: height / 4,
                    marginLeft: 10, width: width / 1.3, borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30, overflow: 'hidden'
                }}

                anchorPosition='bottom'>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ overflow: 'hidden' }}
                >
                    {dropdownItems?.length > 0 && (
                        <>
                            {!!dropdownItems && dropdownItems.map((item: any, index: any) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                                    <List.Item key={index} titleStyle={{ color: '#000', width: width / 1.7 }}
                                        title={item} onPress={() => onDropdownItemPress(item, title)} />

                                    {editItems == null && <TouchableOpacity onPress={() => Itemdelete(index, title)}>
                                        <AntDesign
                                            name='delete'
                                            color={'#707070'}
                                            size={20}
                                            style={{ marginTop: 15, marginRight: 10 }}
                                        />
                                    </TouchableOpacity>}
                                </View>
                            ))}
                        </>
                    )}

                </ScrollView>
            </Menu>









        </View>
    );
};

export default MenuInputDropdown;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        // borderColor: '#E0E0E0',
        // borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        paddingVertical: 8,
        paddingHorizontal: 10,
        paddingLeft: 5
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    contentContainer: {
        width: '85%',
        alignSelf: 'center',
        marginTop: 12,
    },
    nameText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#707070',
        marginVertical: 7,
        width: 150
    },
    nameTexts: {
        fontWeight: '500',
        fontSize: 14,
        color: '#707070',
        marginVertical: 7,
    },
    // textInput: {
    //     borderWidth: 1,
    //     borderRadius: 50,
    //     height: 45,
    //     borderColor: '#C9C9C9',
    //     backgroundColor: '#FFFFFF',
    //     marginTop: 5,
    //     paddingLeft: 20,
    //     color: '#4D4D4D',
    //     // fontFamily: 'Poppins-Medium',
    //     fontSize: 15,
    //     // fontWeight: 'bold'
    // },
    dropdownItem: {
        padding: 10,
        borderBottomColor: '#4d4d4d',
    },
})





