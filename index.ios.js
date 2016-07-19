//var React = require('react-native');
//
//var {
//    Text,
//    View,
//    AppRegistry
//} = React;
var formatTime = require('minutes-seconds-milliseconds');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var StopWatch = React.createClass({
    getInitialState : function(){
        return {
            timeElapsed : null,
            running : false
        }
    },
    render : function(){
        return <View style={Styles.container}>
            <View style={[Styles.header,this.border('yellow')]}> 
                <View style={[this.border('red'),Styles.timerWrapper]}>
                    <Text style={Styles.timer}>
                    {formatTime(this.state.timeElapsed)}
                    </Text>
                </View>
                <View style={[this.border('green'),Styles.buttonWrapper]}>
                   {this.startStopButton()}
                   {this.lapButton()}
                </View>
            </View>
                <View style={[Styles.footer,this.border('blue')]}>
                    <Text>
                        I am list of Laps
                    </Text>
                </View>
            </View>
    },
    startStopButton : function(){
        var style = this.state.running ? Styles.stopButton : Styles.startButton
        return <TouchableHighlight 
            underlayColor="gray" 
            onPress = {this.handleStartPress}
            style = {[Styles.button,style]}
            >
                <Text>
                    {this.state.running ? 'stop' : 'start'}
                </Text>
            </TouchableHighlight>
    },
    lapButton : function(){
        return <TouchableHighlight style = {Styles.button}>
                <Text>
                    Lap
                </Text>
            </TouchableHighlight>
    },
    handleStartPress : function(){
        if(this.state.running){
            clearInterval(this.interval);
            this.setState({running:false});
            return
        }
        var startTime = new Date();
        this.interval = setInterval(()=> {
            this.setState({ 
               timeElapsed : new Date() - startTime,
               running : true
            });   
        },30);
    },
    border : function(color){
        return {
            //borderColor : color,
            //borderWidth : 4
        }
    }
});

var Styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems: 'stretch'
    },
    header : {
        flex: 1
    },
    footer : {
        flex: 1
    },
    timerWrapper :{ //red
        flex : 5, //takes up 5/8th of available space
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonWrapper :{ //green
        flex : 3, //takes up 3/8th of available space
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    timer : {
        fontSize : 60
    },
    button : {
        borderWidth : 2,
        height : 100,
        width : 100,
        borderRadius : 50,
        justifyContent : 'center',
        alignItems : 'center'
    },
    startButton :{
        borderColor : '#00CC00'
    },
    stopButton : {
        borderColor : '#CC0000'
    }
});
//AppRegistry.registerComponent('stopwatch',function(){
//    return StopWatch;
//});

AppRegistry.registerComponent('stopwatch',()=> StopWatch);