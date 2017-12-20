import React from 'react';
import TodoList from './todos-list';
import CreateTodo from './create-todo';
import Search from './search';
import _ from 'lodash';
import axios from 'axios';
import './app.css';
let todos = [];

class App extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
           todos: []
    }

    this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
         this.fetchTodos();
    };

    fetchTodos() {
        axios.get('http://localhost:8848/api/todos')
        .then(
            (value) => {
                this.setState({
                    todos: value.data.data
            }
        );
        });
    }

    render() {
        return(
            <div className="main-container">
                <h1>React Todo App</h1>

                <Search search={this.handleSearch}/>

                <TodoList 
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask = {this.saveTask.bind(this)}
                    deleteTask = {this.deleteTask.bind(this)}
                />

                <CreateTodo createTask={this.createTask.bind(this)}/>
            </div>
        ); 
    }

    toggleTask(name) {
        const foundTodo = _.find(this.state.todos, todo => todo.name === name);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({todos: this.state.todos});
    }

    createTask(name) {
        // console.log('name',name);
        this.state.todos.push({
            name,
            isCompleted: false
        });

        this.setState({
            todos: this.state.todos
        });

        
        axios.post('http://localhost:8848/api/todos', {
            name: name
        }).then((res) => {
            console.log('this', res);
            this.setState({
                todos: res.data.data
            });
        }).then(() => {
            this.fetchTodos();
        });
    }
    

    saveTask(oldTask, newTask) {
        // const foundTodo = _.find(this.state.todos, todo => todo.name === oldTask);
        // foundTodo.name = newTask;
        // this.setState({todos: this.state.todos});

        const foundId = _.find(this.state.todos, todo => todo.name === oldTask  );
        console.log('Found Id=====',foundId);

        axios.put('http://localhost:8848/api/todos/' + foundId.id, {
            name: newTask
        }).then((res) => {
            this.setState({
                todos: res
            });
        }).then(() => {
            this.fetchTodos();
        });
    }

    deleteTask(taskToDelete) {
        const foundId = _.find(this.state.todos, todo => todo.name === taskToDelete);

        axios.delete('http://localhost:8848/api/todos/' + foundId.id, {
            todos: {name: taskToDelete}
        })
        .then(
            (res) => {
                this.setState({
                    todos: res
            }
        );
        })
        .then(
            () => {
                this.fetchTodos();
            }
        )
    }

    handleSearch(key) {
        axios.get('http://127.0.0.1:8848/api/todos/search', {
            params: {
                key: key
            }
        }).then((value) => {
            console.log('value', value);
            this.setState({
                todos: value.data.data
            })
        });
            
    }
}

export default App;