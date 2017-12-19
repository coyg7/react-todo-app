import React from 'react';

class TodoListHeader extends React.Component {
    render() {
        return(
            <table>
                <thread>
                    <tr>
                        <th>Task</th>
                        <th>Action</th>
                    </tr>
                </thread>
            </table>
        );
    }
}

export default TodoListHeader;