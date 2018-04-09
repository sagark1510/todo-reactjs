import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';

const InputBar = ({task, onChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="row p-3">
                <input
                    placeholder="Enter your todo"
                    type="text"
                    value={task.title}
                    name="title"
                    onChange={(e) => onChange(e.target.value)}
                    className="form-control col mr-3" />
                <Button type="submit" onClick={onSubmit} color="success">{task.id ? 'Update' : 'Add'}</Button>
            </div>
        </form>
    );
};

InputBar.propTypes = {
    task: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default InputBar;
