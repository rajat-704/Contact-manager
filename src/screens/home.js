import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";
import { FlatList } from 'react-native-gesture-handler';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.getAllContact())
    }

    getAllContact = async () => {
        // Alert.alert("inside Async")
        await AsyncStorage.getAllKeys()
            .then(async keys => {
                //console.log(keys);
                try {
                    const result = await AsyncStorage.multiGet(keys);
                    this.setState({
                        data: result
                    });
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(error => {
                console.log(error);
                Alert.alert(error);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => {
                        var contact = JSON.parse(item[1]);
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("ViewContact", {
                                        key: item[0].toString()
                                    })
                                }}
                            >
                                <Card style={styles.listItem}>
                                    <View style={styles.iconContainer}>
                                        <Text style={styles.contactIcon}>
                                            {contact.fname[0].toUpperCase()}
                                        </Text>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.infoText}>
                                            {contact.fname} {contact.lname}
                                        </Text>
                                        <Text style={styles.infoText}>
                                            {contact.phone}
                                        </Text>
                                        <Text style={styles.infoText}>
                                            {contact.email}
                                        </Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => item[0].toString()}
                />

                <TouchableOpacity style={styles.floatButton}
                    onPress={() => { this.props.navigation.navigate("AddNewContact") }}>
                    <Text style={{ color: "#FFFFFF" }}>Add</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    listItem: {
        flexDirection: "row",
        padding: 20
    },
    iconContainer: {
        width: 50,
        height: 50,

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B83227",
        borderRadius: 100
    },
    contactIcon: {
        fontSize: 28,
        color: "#fff"
    },
    infoContainer: {
        flexDirection: "column"
    },
    infoText: {
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 10,
        paddingTop: 2
    },
    floatButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: "#B83227",
        borderRadius: 100
    }
});
