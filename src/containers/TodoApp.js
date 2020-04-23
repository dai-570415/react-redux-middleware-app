import { connect } from 'react-redux';
import TodoApp from '../components/TodoApp';
import { inputTask, addTask } from '../actions/tasks';

const mapStateToProps = ({ task, tasks }) => {
    return {
        task, // Inputに入力されたタスク
        tasks, // タスクの配列
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // タスクを追加する関数
        addTask(task) {
            dispatch(addTask(task));
        },
        //　タスクを入力する関数
        inputTask(task) {
            dispatch(inputTask(task));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);