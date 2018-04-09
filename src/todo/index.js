import React, {Component} from 'react';
import InputBar from './inputbar';
import ListItem from './listitem';

const TASK_DTO = {
    title: '',
    id: '',
    isDone: false,
};

/**
 * App component
 */
class App extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.saveTodo = this.saveTodo.bind(this);

        this.state = {
            todoList: [],
            task: {...TASK_DTO},
            currentId: 1,
        };
    }

    /**
     * add/edit task
     *
     * @param {object} e
     */
    saveTodo(e) {
        e.preventDefault();

        const {task, todoList, currentId} = this.state;

        if (task.title == '' || task.title.trim() == '') return;

        if (task.id) {
            this.setState({
                task: {...TASK_DTO},
                todoList: todoList.map((item) => {
                    if (item.id === task.id) return task;
                    return item;
                }),
            });
            return;
        }
        this.setState({
            todoList: [...todoList, {...task, id: currentId}],
            currentId: currentId + 1,
            task: {...TASK_DTO},
        });
    }

    /**
     * render item
     *
     * @param {object} item
     * @param {number} index
     *
     * @return {component}
     */
    renderItem(item, index) {
        return (
            <ListItem
                key={`todo-item-${item.id}`}
                item={item}
                index={index}
                onEdit={() => this.setState({task: item})}
                onDelete={() => this.setState({todoList: this.state.todoList.filter((task) => task.id !== item.id)})}
                onDoneToggle={() => {
                    this.setState({
                        todoList: this.state.todoList.map((task) => {
                            if (task.id === item.id) return {...task, isDone: !task.isDone};
                            return task;
                        }),
                    });
                }}
            />
        );
    }

    /**
     * @return {component}
     */
    render() {
        return (
            <div className="container">
                <InputBar
                    task={this.state.task}
                    onChange={(title) => this.setState({task: {...this.state.task, title}})}
                    onSubmit={this.saveTodo}
                />
                <ul className="list-group">
                    {this.state.todoList.map(this.renderItem)}
                </ul>
            </div>
        );
    }
}

export default App;
