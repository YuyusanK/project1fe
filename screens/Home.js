import React from 'react';
import styles from '../Constants/HomeStyle';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import ItemInfo from "./components/ItemInfo";
import EditItem from "./EditItem";
import {EdgeInsetsPropType} from "react-native-web";

export default class home extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            numberStr: '',
            passwordStr: '',
            PIDStr:'',
            userInfoJson:[]
        }
    }

    setUserInfoJson = async (userInfo) =>{
        this.setState({userInfoJson: userInfo});
    };

    retrieveUserData = async () =>{

        await fetch('https://lab5redo8-4-20.herokuapp.com/userInterface', {method: 'GET', headers:
                {Accept:'application/json', 'Content-Type': 'application/json'},
        })
            .then((response)=> response.json())
            .then((responseJson)=> {
                this.setState({userInfoJson:responseJson});
                console.log('look', responseJson);
            })
            .catch((error)=> {console.error(error);});
    };

    async componentDidMount() {
        await this.retrieveUserData();
    }

    handleAdd = () => {
        this.props.navigation.navigate("actions")
    };

    render(){
        console.log("home page array length", this.state.userInfoJson.length);
        return(
                <View style={styles.Home}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}> Home </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.Add}
                        onPress={this.handleAdd}
                    >
                        <Text style={styles.buttonText}>
                            + Add Item
                        </Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View>
                            {this.state.userInfoJson.map(item=>{
                                if(item){


                                    return <ItemInfo  msg={item.itemInfo} navigation={this.props.navigation} PIDStr={item.pid} param={this.state} changeState={this.setUserInfoJson}/>

                                }
                            })}
                        </View>
                    </ScrollView>
                </View>
        );
    }
};
