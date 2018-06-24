class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options : props.options
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
        alert(randomOption);
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
        const subTitle = 'I am a sub title';
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
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}

const Header = (props) => {
    return (
           <div>
                <h1>{props.title}</h1>
                <h2>{props.subTitle}</h2>
            </div>
        );

}

Header.defaultProps = {
    title: 'Indecision App'
}

const Action = (props) => {
        return (
            <div>
                <button
                    onClick={props.handlePick}
                    disabled={!props.hasOptions}
                >Im a Button.</button>
            </div>
        )
    
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {
                props.options.map(
                    (option) => (
                        <Option 
                        key={option} 
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
         </div>
        );
}

const Option = (props) => {
    return (
        <div>
            Option: {
                props.optionText
            }
            <button onClick={(e)=>{
                props.handleDeleteOption(props.optionText)
            }}>remove</button>
        </div>
    );

}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error : undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value;
        const error =  this.props.handleAddOption(option);

        this.setState( () => {
            return { error };
        })
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button> Add Option </button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp options={['one','two']}/>, document.getElementById('app'));