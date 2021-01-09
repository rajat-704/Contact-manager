import React, { Component } from 'react';
import {
    StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert,
    Platform, Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, CardItem } from 'native-base';
import { Link } from '@react-navigation/native';

export default class ViewContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "DummyText",
            lname: "DummyText",
            phone: "DummyText",
            email: "DummyText",
            address: "DummyText",
            key: "DummyText"
            //Dummy text to prevent from crash if key no their
        }
    }

    componentDidMount() {
        const { key } = this.props.route.params;

        this.props.navigation.addListener('willFocus', this.getContact(key))
    }

    getContact = async key => {
        // Alert.alert("Get Contact");
        await AsyncStorage.getItem(key)
            .then(contactjsonString => {
                console.log(key);
                var contact = JSON.parse(contactjsonString);
                contact["key"] = "key";
                this.setState(contact);
            })
            .catch(error => {
                console.log(error);
            })
    }

    callAction = phone => {
        let phoneNumber = phone;
        // validate number using regular expression
        if (Platform.OS !== "android") {
            phoneNumber = `telprompt:${phone}`;//Be careful here we use this ` not this '
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert("Not present");
                } else {
                    return Linking.openURL(phoneNumber);
                }
            }
            )
            .catch(error => {
                console.log(error);
            })
    }

    smsAction = phone => {
        let phoneNumber = phone;
        // validate number using regular expression
        phoneNumber = `sms:${phone}`;
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert("Not present");
                } else {
                    return Linking.openURL(phoneNumber);
                }
            }
            )
            .catch(error => {
                console.log(error);
            })
    }

    editConact = (key_contact) => {
        this.props.navigation.navigate("EditContact",
            { key: key_contact }
        )
    }

    deleteContact = key => {
        Alert.alert(
            "Delete Contact",
            "Are you sure ? ",
            [
                { text: "cancel", onPress: () => console.log("CANCEl") },
                {
                    text: "OK", onPress: async () =>
                        await AsyncStorage.removeItem(key)
                            .then(() => {
                                console.log("Delete")
                                this.props.navigation.goBack();
                            })
                            .catch(error => {
                                console.log(error);
                            })
                }
            ]
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contactIconContainer}>
                    <Text style={styles.contactIcon}>
                        {this.state.fname[0].toUpperCase()}
                    </Text>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>
                            {this.state.fname} {this.state.lname}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Card>
                        <CardItem bordered>
                            <Text style={styles.infoText}>Phone</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Text style={styles.infoText}>{this.state.phone}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered>
                            <Text style={styles.infoText}>Email</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Text style={styles.infoText}>{this.state.email}</Text>
                        </CardItem>
                    </Card>
                </View>
                <Card style={styles.actionContainer}>
                    <CardItem style={styles.actionButton} bordered>
                        <TouchableOpacity
                            onPress={() => { this.smsAction(this.state.phone) }}>
                            <Text>SMS</Text>
                        </TouchableOpacity>
                    </CardItem>
                    <CardItem style={styles.actionButton} bordered>
                        <TouchableOpacity
                            onPress={() => { this.callAction(this.state.phone) }}>
                            <Text>Call</Text>
                        </TouchableOpacity>
                    </CardItem>
                </Card>
                <Card style={styles.actionContainer}>
                    <CardItem style={styles.actionButton} bordered>
                        <TouchableOpacity
                            onPress={() => this.editConact(this.state.key)}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    </CardItem>
                    <CardItem style={styles.actionButton} bordered>
                        <TouchableOpacity
                            onPress={() => this.deleteContact(this.state.key)}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    contactIconContainer: {
        height: 200,
        backgroundColor: "#B83227",
        alignItems: "center",
        justifyContent: "center"
    },
    contactIcon: {
        fontSize: 100,
        fontWeight: "bold",
        color: "#fff"
    },
    nameContainer: {
        width: "100%",
        height: 70,
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        position: "absolute",
        bottom: 0
    },
    name: {
        fontSize: 24,
        color: "#000",
        fontWeight: "900"
    },
    infoText: {
        fontSize: 18,
        fontWeight: "300"
    },
    infoContainer: {
        flexDirection: "column"
    },
    actionContainer: {
        flexDirection: "row"
    },
    actionButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    actionText: {
        color: "#B83227",
        fontWeight: "900"
    }
});