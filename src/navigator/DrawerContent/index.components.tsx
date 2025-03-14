import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ProfileContext } from '../../context/ProfileContext';

const DrawerContent = (props: any) => {
    const menuItems = [
        { name: 'Earnings', label: 'My Earnings', icon: 'money' },
        { name: 'Wallet', label: 'Wallet', icon: 'google-wallet' },
        { name: 'RewardIncentives', label: 'Reward & Incentives', icon: 'gift' },
        { name: 'ReferEarn', label: 'Refer & Earn', icon: 'mail-forward' },
        { name: 'Support', label: 'Support', icon: 'life-ring' },
        { name: 'TermsConditions', label: 'Terms & Conditions', icon: 'newspaper-o' },
    ];

    const { profile }: any = useContext(ProfileContext)
    // console.log(profile, '                         ====');

    const handleProfile = () => {
        props.navigation.navigate('ProfileEdit')
    }

    return (
        <DrawerContentScrollView {...props}>
            <Drawer.Section>
                <View style={styles.header}>
                    <View style={styles.userSection}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('DashBoard')}>
                            <FontAwesome name='chevron-left' style={styles.backicon} size={24} />
                        </TouchableOpacity>
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={{ color: '#4d4d4d' }}>{profile?.name}</Text>
                            <Text style={{ color: '#4d4d4d' }}>IdNo:{profile?.HomeeDBId}</Text>
                        </View>
                        <TouchableOpacity onPress={handleProfile}>
                            <View>
                                <Image source={{ uri: profile?.profileImageUri|| 'https://example.com/default-placeholder.png'}} style={{ width: 80, height: 80, borderRadius: 50 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate(item.name)}
                        style={styles.menuItem}
                    >
                        <FontAwesome name={item.icon} style={styles.icon} size={24} />
                        <Text style={styles.menuLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </Drawer.Section>
        </DrawerContentScrollView>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderBottomWidth: 0.5,
        padding: 20,
    },
    userSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        color: '#03894E',
        paddingLeft: 5
    },
    backicon: {
        color: '#03894E',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,

    },
    menuLabel: {
        padding: 10,
        color: '#03894E',
        fontSize: 20
    },
});
