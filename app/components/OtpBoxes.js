import React, { Component } from 'react';
import { forwardRef, use, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';
import InputText from './InputText';

class OtpBoxes extends React.Component {

    element = [];

    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        this.element[0].focus();
    }

    render(){
        const { style, onChangeText1, onChangeText2, onChangeText3, onChangeText4 } = this.props;
        return(
            <View style={[styles.container, style]}>
                <TextInput
                ref={ref => this.element[0] = ref}
                style={styles.box} 
                maxLength={1} 
                keyboardType="number-pad" 
                onChangeText={(text) => {if(text) this.element[1].focus(); else this.element[0].focus(); onChangeText1(text); } } 
                />

                <TextInput
                ref={ref => this.element[1] = ref}
                style={styles.box}
                maxLength={1} 
                keyboardType="number-pad" 
                onChangeText={(text) => {if(text) this.element[2].focus(); else this.element[0].focus(); onChangeText2(text); } }
                />

                <TextInput
                ref={ref => this.element[2] = ref}
                style={styles.box} 
                maxLength={1} 
                keyboardType="number-pad" 
                onChangeText={(text) => {if(text) this.element[3].focus(); else this.element[1].focus(); onChangeText3(text); } }/>

                <TextInput 
                ref={ref => this.element[3] = ref}
                style={styles.box} 
                maxLength={1} 
                keyboardType="number-pad" 
                onChangeText={(text) => {if(text) this.element[3].focus(); else this.element[2].focus(); onChangeText4(text); } } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.lighter,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})


export default OtpBoxes;