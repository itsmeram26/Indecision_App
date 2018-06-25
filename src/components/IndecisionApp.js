import React from 'react'

import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './OptionModal'

class IndecisionApp extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this);
        this.state = {
            options : props.options,
            selectedOption : undefined 
        }
    }
    componentDidMount(){
        
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState( () => ({
                    options
                }))
            }
        } catch(err){
            console.log(err);
        }

    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    
    componentWillUnmount(){
        console.log('componentWillUnMount');
    }

    handleDeleteOptions() {
        this.setState( () => ({ options: []}));
    }
    handleClearSelectedOption() {
        this.setState(()=> ({
            selectedOption : undefined
        }))
    }
    handleDeleteOption(removeElement) {
        this.setState((prevState)=>({
            options : prevState.options.filter((option)=> {
                return option !== removeElement;
            })
        }))
    }
    handlePick() {
        const randomValue = Math.floor(Math.random() * this.state.options.length);
        const randomOption = this.state.options[randomValue];
        this.setState(()=> ({
            selectedOption : randomOption
        }));
    }
    handleAddOption(option) {
        if(!option) {
            return 'Enter Valid value';
        }
        this.setState( (prevState) => ({ 
            options : prevState.options.concat([option])
        }));
    }
    render() {
        const subTitle = 'I am a sub-title';
        return (
            <div>
                <Header subTitle={subTitle}/>
                <Action 
                    hasOptions = {this.state.options.length>0}
                    handlePick = {this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                handleAddOption = {this.handleAddOption}
                />
                <OptionModal 
                selectedOption={this.state.selectedOption}
                handleClearSelectedOption={this.handleClearSelectedOption} 
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}

export default IndecisionApp;