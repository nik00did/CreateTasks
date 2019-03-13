import React, {Component} from 'react';
import {View, Text, TextInput, TouchableHighlight, Alert} from 'react-native';
import Modal from 'react-native-modalbox';

export default class ModalAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            content:""
        }
    }
    ShowModalAdd = () => this.refs.modal.open();
    OK = () => {
        let arr = this.props.mainProp.state.tasks;
        for(let i=0; i<arr.length;i++) if(arr[i].id === this.state.id) return alert("The list already includes this name. Please, write another name!");
        if(this.state.id === "") return alert("The name mustn't be empty. Please, write name!");
        this.props.mainProp.Add(this.state.id);
        this.refs.modal.close();
        this.props.mainProp.Content(this.state.id,this.state.content);
        this.setState({id:''});
    };
    render() {
        return (
            <Modal ref="modal" style={{
                height:150,
                width:300,
                borderRadius:30,
                backgroundColor:'lightskyblue',
                alignItems:'center',
                justifyContent:'center'
            }}>
                    <TextInput ref="TextInputContent" maxLength = {22} style={{
                        width:160,
                        height:40,
                        borderWidth:2,
                        borderColor:'lightskyblue',
                        borderRadius:5,
                        marginTop:5,
                        backgroundColor:'ghostwhite'
                    }} placeholder="   WRITE NOTE'S NAME" value={this.state.id} onChangeText={(id) => this.setState({id})}/>
                    <TouchableHighlight underlayColor='dodgerblue' style={{
                        height:40,
                        width:60,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'lightskyblue',
                        marginTop:10,
                        borderRadius:5,
                        borderColor:'white',
                        borderWidth:1
                    }} onPress={this.OK}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize:20,
                            color:'ghostwhite'
                        }}>OK</Text>
                    </TouchableHighlight>
            </Modal>
        );
    }
}