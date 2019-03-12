import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            sendId:this.props.id,
            sendContent:this.props.content
        };
    }
    render(){
        return (
            <View style={{
                height:40,
                width:300,
                marginTop:15,
                backgroundColor:'lightskyblue',
                borderRadius:20
            }}>
                <View>
                    <TouchableHighlight underlayColor='dodgerblue' style={{
                        height:40,
                        width:300,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:20,
                    }} onPress={()=>this.props.contentMethod(this.state.sendId,this.state.sendContent)} activeOpacity={0.1} >
                        <Text style={{
                            fontSize:20,
                            fontWeight: 'bold',
                            padding:5,
                            color:'white',
                            marginLeft:5
                        }}>{this.state.sendId}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}