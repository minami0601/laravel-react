import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//RenderRowsの機能実装
function RenderRows(props){
    //mapでループしている（for相当）
    return props.todos.map(todo => {
        return (
            <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><button className="btn btn-secondary">完了</button></td>
            </tr>
        );
    });
}

export default class TodoApp extends Component {

    //コンストラクタ内でstateにtodosを宣言
    constructor(){
        super();
        this.state = {
            todos: []
        }
    }

    //コンポーネントがマウントされた時点で初期描画用のtodosをAPIから取得
    componentDidMount(){
        axios
            .get('/api/get')
            .then((res) => {
                //todosを更新（描画がかかる）
                this.setState({
                    todos: res.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    //テーブルの骨組みを描画し、行の描画はRenderRowsに任せる（その際、todosを渡す）
    render() {
        return (
            <React.Fragment>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>タスク</th>
                            <th>完了</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 行の描画 */}
                        <RenderRows
                            todos={this.state.todos}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('todoApp'));