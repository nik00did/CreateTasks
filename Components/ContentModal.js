import React, {Component} from 'react';
import {View, Text, TextInput, TouchableHighlight, Dimensions, Image, Alert, ImageBackground} from 'react-native';
import Modal from 'react-native-modalbox';

let screen = Dimensions.get('window');

export default class ContentModal extends Component {//not fixed
    constructor(props){
        super(props);
        this.state = {
            getName:'',
            getContent:'',
            editableInput:true,
            isVisible:true
        };
        this.SendDataToMain = this.SendDataToMain.bind(this);
    }
    _close = () => {
            Alert.alert(
                "Save",
                "Would you like to save your changes?",
                [
                    {text:'No',onPress: () => {
                            this.refs.Modal.close();
                            this.props.MainProp.setState({isChanged:false});
                            alert("Cancel save!");
                        }, style:'cancel'},
                    {text:'Yes',onPress:() => {
                            this.setState({getContent:this.refs.TextInputValue.props.value});
                            //this.setState({editableInput:false});
                            this.SendDataToMain(this.state.getName,this.state.getContent);
                            this.refs.Modal.close();
                            this.props.MainProp.setState({isChanged:false});
                            alert("Task saved!");
                        }},
                    {cancelable:false}
                ],
            );

    };
    SendDataToMain = (id,content) => this.props.MainProp.RecordTasks(id,content);
    ShowContentModal = (name,text) =>{
        this.refs.Modal.open();
        this.props.MainProp.setState({isChanged:true});
        this.setState({getName:name});
        this.setState({getContent:text});
    };
    delete = () =>{
        Alert.alert(
            "DELETE",
            "Are you sure to delete this task?",
            [
                {text:'No',onPress: () => {
                        //this.setState({editableInput:false});
                        //this.props.MainProp.setState({isChanged:false});
                    }, style:'cancel'},
                {text:'Yes',onPress:() => {
                        //this.setState({editableInput:false});
                        this.props.MainProp.setState({isChanged:false});
                        this.props.MainProp.Delete(this.state.getName);
                        this.refs.Modal.close();
                        alert("Task deleted!");
                    }},
                {cancelable:false}
            ],
        );
    };
    render(){
        return (
            <Modal swipeToClose={false} ref='Modal' style={{
                height:screen.height,
                width:screen.width,
                justifyContent:'flex-start',
                alignItems:'center'
            }} isVisible={this.state.isVisible} onSwipeComplete={() => this.setState({isVisible:true})} swipeDirection="bottom" onModalWillHide={()=>null}>
                <ImageBackground source={require('../Image/background4.jpg')} style={{
                    flex:1,
                    width:'100%',
                    height:'100%'
                }}>
                <View style={{
                    height:screen.height,
                    width:screen.width,
                }}>
                    <View style={{
                        alignItems:'center',
                        height:screen.height,
                        width:screen.width,
                        borderWidth:5
                    }}>
                            <View style={{
                                height:40,
                                width:screen.width-100,
                                alignItems:'center',
                                justifyContent:'center',
                                padding:5,
                                borderColor:'white',
                                borderRadius:20,
                                backgroundColor:'lightskyblue',
                                marginTop:5,
                                marginRight:50
                            }}>
                                <Text style={{fontSize:20, color:'white', fontWeight: 'bold'}}>{this.state.getName.length>25?this.state.getName.slice(0,25)+"...":this.state.getName}</Text>
                            </View>
                            <TextInput style={{
                                width:screen.width-40,
                                justifyContent:'flex-start',
                                borderWidth:3,
                                marginTop:16.5,
                                marginBottom:16.5,
                                backgroundColor:'white',
                                maxHeight:screen.height-170,
                                borderColor:'#87CEFA',
                                borderRadius:30,
                                padding:20
                            }} editable = {this.state.editableInput} maxLength = {500} multiline = {true}  onChangeText={
                                (getContent) => this.setState({getContent})
                            } value={this.state.getContent} placeholder="WRITE HERE" ref="TextInputValue"/>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                            justifyContent:'center',
                            width:200,
                            alignItems:'center',
                            marginBottom:16.5,
                            position:'absolute',
                            marginTop:screen.height-100
                        }}>
                            <TouchableHighlight underlayColor='darkred' style={{
                                width:100,
                                height:50,
                                alignItems:'center',
                                borderRadius:20,
                                justifyContent:'center',
                                backgroundColor:'#ff4040'
                            }} onPress={this.delete}>
                                <Text style={{color:'white', fontWeight: 'bold'}}>DELETE</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <TouchableHighlight style={{
                        width:40,
                        height:40,
                        borderRadius:30,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'lightcoral',
                        position: 'absolute',
                        marginLeft:screen.width-65,
                        marginTop:10
                    }} onPress={this._close}>
                        <Image style={{
                            width:45,
                            height:45
                        }} source={require('../Image/close1.png')}/>
                    </TouchableHighlight>
                </View>
                </ImageBackground>
            </Modal>
        );
    }
}