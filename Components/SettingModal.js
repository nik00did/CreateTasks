import React, {Component} from 'react';
import {Text, View, TouchableHighlight, Alert} from 'react-native';
import Modal from 'react-native-modalbox';

export default class SettingModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            _content:''
        };
    }
    ShowSettingModal = (id,sendContent) =>{
        this.refs.modal.open();
        this.setState({name:id});
        this.setState({_content:sendContent});
    };
    View = () => {
        this.refs.modal.close();
        this.props.mainProp.Content(this.state.name,this.state._content);
        this.props.mainProp.setState({isChanged:true});
    };
    Delete = () => {
        Alert.alert(
            "Delete",
            "Are you sure to delete this task?",
            [
                {text:'No',onPress: () => alert("Cancel delete!"), style:'cancel'},
                {text:'Yes',onPress:() => alert("Pressed 'Yes'. Task deleted!")},
                {cancelable:false}
            ],
        );
        this.refs.modal.close();
    };
    render(){
        return (
            <Modal ref='modal' style={{
                flexDirection:'column',
                borderRadius:20,
                shadowRadius:10,
                //borderWidth:5,
                width:250,
                height:100,
                backgroundColor:'lightskyblue',
                //borderColor:'royalblue'
            }} position='center' backdop={true} onClosed={() => {}}>
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop:5
                }}>
                    <Text style={{color:'ghostwhite'}}>{this.state.name}</Text>
                    <View style={{
                        flexDirection:'row',
                        marginTop:5
                    }}>
                        <TouchableHighlight style={{
                            height:70,
                            width:125,
                            borderRightWidth:1,
                            borderTopWidth:1,
                            borderColor:'royalblue',
                            borderBottomLeftRadius:20,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'paleturquoise'
                        }} onPress={this.View}>
                            <Text style={{
                                fontSize:30,
                                color:'white',
                                fontWeight:'bold'
                            }}>VIEW</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{
                            height:70,
                            width:125,
                            borderLeftWidth:1,
                            borderTopWidth:1,
                            borderColor:'royalblue',
                            borderBottomRightRadius:20,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'lightcoral'
                        }} onPress={this.Delete}>
                            <Text style={{
                                fontSize:30,
                                color:'white',
                                fontWeight:'bold'
                            }}>DELETE</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}