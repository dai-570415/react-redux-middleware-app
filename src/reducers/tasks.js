// State(初期値)
const initialState = {
    task: '',
    tasks: [],
}

// Reducer
const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INPUT_TASK':
        return {
            ...state,
            task: action.payload.task
        };
        case 'ADD_TASK':
        return {
            ...state,
            tasks: state.tasks.concat([action.payload.task])
        };
        default:
        return state;
    }
}

export default tasksReducer;