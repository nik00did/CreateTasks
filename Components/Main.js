import React, {Component} from 'react';
import {AsyncStorage,View, Text, FlatList, TouchableHighlight, Image,ImageBackground, Dimensions} from 'react-native';
import Task from '../Components/Task';
import ContentModal from '../Components/ContentModal';
import ModalAdd from '../Components/ModalAdd';

let screen = Dimensions.get('window');

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            isRefreshing:false,
            isChanged: true
        };
        this.Add=this.Add.bind(this);
        this.Delete=this.Delete.bind(this);
        this._LoadTasks();
    }
    _SaveTasks = async() => await AsyncStorage.setItem("tasks",JSON.stringify(this.state.tasks,null,' '));
    _LoadTasks = async() => {
        let data = JSON.parse(await AsyncStorage.getItem("tasks"));
        if(!data) data=Array();
        this.setState({tasks:data,isChanged:false});
    };
    GoToModalAdd = () => this.refs.ModalAdd.ShowModalAdd();
    Add = (Id) => {
        let arr = this.state.tasks;
        this.setState({tasks:[...arr,{id:Id,content:""}]});
        this._SaveTasks();
    };
    Content = (name,text) => this.refs.ContentModal.ShowContentModal(name,text);
    RecordTasks = (id,content) => {
        let arr = this.state.tasks;
        this.setState({tasks:arr.map(
            (item) =>{
                if(item.id === id){
                    item.content=content;
                    return item;
                }
                else return item;
            })
        });
        this._SaveTasks();
    };
    Delete = (Id) => {
        let arr = this.state.tasks.filter((a)=>a.id!==Id);
        this.setState({tasks:arr});
        this.onRefresh();
        this._SaveTasks();
    };
    onRefresh = async()=>{
        this.setState({isRefreshing:true, isChanged:true});
        this.setState({isRefreshing:false, isChanged:false});
    };
    renderFlatList = (array) => {
        return (
            <ImageBackground source={require('../Image/background4.jpg')} style={{
                flex:1,
                width:'100%',
                height:'100%'
            }}>
                <View style={{
                    flex:1,
                    width:screen.width,
                    height:screen.height
                }}>
                    <View style={{
                        height:70,
                        width:screen.width,
                        backgroundColor:'#8b0000',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <Text style={{
                            color:'white',
                            fontWeight:'bold',
                            fontSize:30,
                        }}>YOUR NOTES</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        {(!this.state.isChanged && <FlatList refreshing={this.state.isRefreshing} onRefresh={() => this.onRefresh()} data={array} extraData={array}  renderItem={({item}) => {
                            return (
                                <Task data={item} id={item.id} content={item.content} contentMethod={this.Content}/>
                            );
                        }} keyExtractor={(item) => item.id}>
                        </FlatList>)}
                    </View>
                    <View style={{
                        position: 'absolute',
                        width:60,
                        height:60,
                        marginLeft:280,
                        marginTop:10
                    }}>
                        <TouchableHighlight  style={{
                            width:50,
                            height:50,
                            borderRadius:30,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'white',
                        }} onPress={this.GoToModalAdd}>
                            <Image style={{
                                width:55,
                                height:55
                            }} source={require('../Image/add6.png')}/>
                        </TouchableHighlight>
                    </View>
                    <ContentModal ref='ContentModal' MainProp={this}/>
                    <ModalAdd ref='ModalAdd' mainProp={this}/>
                </View>
            </ImageBackground>
        );
    };
    render(){
        return this.renderFlatList(this.state.tasks);
    }
}