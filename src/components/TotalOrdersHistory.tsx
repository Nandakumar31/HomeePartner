import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const TotalOrdersHistory = () => {
    const data = [
        {
            id: 1,
            url: require('../assets/O.png'),
            qty: 50
        },
        {
            id: 2,
            url: require('../assets/Km.png'),
            qty: 50
        },
        {
            id: 0,
            url: require('../assets/E.png'),
            qty: 50
        },
        {
            id: 3,
            url: require('../assets/LH.png'),
            qty: 50
        }
    ];

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={item.url} style={styles.image} />
                <Text style={styles.qty}>{item.qty}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Today</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.currency}>₹ </Text>
                    <Text style={styles.amount}>0.00</Text>
                </View>
            </View>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                style={styles.list}
            />
        </View>
    );
};

export default TotalOrdersHistory;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currency: {
        fontSize: 18,
        marginRight: 4,
    },
    qty: {
        fontSize: 25,
        position: 'absolute',
        marginVertical: 65,
        color: '#4d4d4d',
        fontWeight: 'bold'
    },
    amount: {
        fontSize: 18,
    },
    list: {
        margin: 10,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 10,

    },
    image: {
    

    },
});
