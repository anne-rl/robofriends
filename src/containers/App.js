import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

// import { robots } from './robots';
// import { render } from "@testing-library/react";


//props are simple things that come out of STATE
//STATE >> props
//a parent feeds STATE into a child component and as soon as the child component receives the STATE, it's a property. (that child can never change the property)

//an app component that has 2 states (robots and searchfield)
//because app owns a state, any component that has state uses the "class" syntax so they can use the constructor function to create "this.state", the state is what changes in an app (what describes the app)
//react uses these states (robots and searchfield) to render and pass them down as props to these components (Searchbox and CardList)
class App extends Component { 
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users') //fetch() is a tool to make requests from server
            .then(response=> response.json())
            .then(users=> this.setState({ robots: users})); 
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
        // console.log(filteredRobots);
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (!robots.length){
            return <h1>Loading</h1>
        }else{
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                        <CardList robots={filteredRobots} /> 
                        </ErrorBoundary>
                    </Scroll>
                </div>      
            );
        }
    }
} 

export default App;