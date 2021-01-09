import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { Form, Item, Input, Label, Button } from 'native-base';

export default class EditContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            phone: "",
            email: "",
            address: "",
            key: ""
        }
    }

    componentDidMount() {
        const { key } = this.props.route.params;
        console.log(this.props.route.params);
        this.props.navigation.addListener("willFocus", this.getContact(key));
    }

    getContact = async (key) => {
        console.log(key)
        await AsyncStorage.getItem(key)
            .then(contactjsonString => {
                var contact = JSON.parse(contactjsonString);
                //set key in contact object
                contact["key"] = key;
                this.setState(contact);
                console.log(this.state.fname);
            }

            )
            .catch(error => { console.log(error) })
    }

    updateContact = async (key) => {
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
            await AsyncStorage.setItem(key, JSON.stringify(contact))
                .then(() => {
                    this.props.navigation.goBack();
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
                                    value={this.state.fname}
                                    onChangeText={fname => { this.setState({ fname: fname }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Last Name</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    value={this.state.lname}
                                    onChangeText={lname => { this.setState({ lname: lname }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Phone</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    value={this.state.phone}
                                    onChangeText={phone => { this.setState({ phone: phone }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>E-mail</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    value={this.state.email}
                                    onChangeText={email => { this.setState({ email: email }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Address</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    value={this.state.address}
                                    onChangeText={address => { this.setState({ address: address }) }}
                                />
                            </Item>
                        </Form>
                        <Button style={styles.button} full onPress={() => { this.updateContact(this.state.key); }}>
                            <Text style={styles.buttonText}>Update</Text>
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
        margin: 10
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
    }
});