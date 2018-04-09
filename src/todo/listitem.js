import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

/**
 * ListItem component
 */
class ListItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        index: PropTypes.number,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func,
        onDoneToggle: PropTypes.func,
    }

    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    /**
     * toggle dropdown state
     */
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    /**
     * Render method
     *
     * @return {component}
     */
    render() {
        const {item, onEdit, onDelete, onDoneToggle} = this.props;

        const titleStl = item.isDone ? {...styles.title, ...styles.doneTitle} : {...styles.title};

        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <a href="javascript:;" onClick={() => onEdit(item)} className="col" style={titleStl}>
                        {item.title}
                    </a>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle color="light" caret>
                            Actions
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={onDoneToggle}>{item.isDone ? 'Mark as Undone' : 'Mark as Done'}</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={onEdit}>Edit</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={onDelete}>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </li>
        );
    }
}

const styles = {
    title: {
        paddingTop: '7px',
        color: 'black',
        textDecoration: 'none',
    },
    doneTitle: {
        color: '#666',
        textDecoration: 'line-through',
    },
};

export default ListItem;
