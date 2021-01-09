import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { Form, Item, Input, Label, Button } from 'native-base';

export default class AddNewContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            phone: "",
            email: "",
            address: ""
        }
    }

    saveContact = async () => {
        if (
            this.state.fname !== "" &&
            this.state.lname !== "" &&
            this.state.phone !== "" &&
            this.state.email !== "" &&
            this.state.address !== ""
        ) {
            var contact = {
                fname: this.state.fname,
                lname: this.state.lname,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address
            }
            await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
                .then(() => {
                    this.props.navigation.navigate("Home");
                }).catch(error => {
                    console.log(error);
                })


        } else {
            Alert.alert("Fill all the fields");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <ScrollView style={styles.container}>
                        <Form>
                            <Item style={styles.inputItem}>
                                <Label>First Name</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    onChangeText={fname => { this.setState({ fname: fname }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Last Name</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    onChangeText={lname => { this.setState({ lname: lname }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Phone</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    onChangeText={phone => { this.setState({ phone: phone }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>E-mail</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    onChangeText={email => { this.setState({ email: email }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Address</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    onChangeText={address => { this.setState({ address: address }) }}
                                />
                            </Item>
                        </Form>
                        <Button style={styles.button} full onPress={() => { this.saveContact(); }}>
                            <Text style={styles.buttonText}>Save</Text>
                        </Button>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
        height: 500
    },
    inputItem: {
        margin: 10
    },
    button: {
        backgroundColor: "#B83227",
        marginTop: 40
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    empty: {
        height: 500,
        backgroundColor: "#FFF"
    }
});