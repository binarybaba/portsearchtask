import React, { Component } from 'react';
import Downshift from 'downshift';
// import { searchPort } from '../API';

class Dropdown extends Component {
    state = {
        items: [],
        isClearDisabled: true,
    };

    handleDownshiftInputChange = (e) => {
        this.handleQueryChange(e.target.value);
    };

    handleQueryChange(value) {
        const { onChange } = this.props;
        if (value.length) {
            if (onChange) {
                onChange(value)
                    .then((debounced) => {
                        debounced()
                            .then(res => this.setState(() => ({ items: res.data.results })));
                    });
            }
        }
        return [];
    }

    handleSelection(item) {
        const { onSelect } = this.props;
        this.setState(() => ({ isClearDisabled: false }));
        if (item) {
            if (onSelect) {
                onSelect(item);
            }
        }
        return null;
    }

    handleReset() { // eslint-disable-line
        // e.preventDefault();
        const { onClearSelection } = this.props;
        this.setState(() => ({ isClearDisabled: true }));
        if (onClearSelection) {
            onClearSelection();
        }
    }

    render() {
        const { items, isClearDisabled } = this.state;
        return (
            <Downshift
                itemToString={item => (item ? item.name : '')}
                onChange={selection => this.handleSelection(selection)}
            >
                {({
                    getInputProps,
                    getMenuProps,
                    getItemProps,
                    isOpen,
                    highlightedIndex,
                    selectedItem,
                    clearSelection,
                  }) => (
                    <div>
                        <input
                            type="text"
                            {...getInputProps({
                                onChange: this.handleDownshiftInputChange,
                            })}
                        />
                        <button
                            type="button"
                            disabled={isClearDisabled}
                            onClick={() => clearSelection(this.handleReset())}
                        >
                            X
                        </button>
                        {
                            !(isOpen && items.length) ? null : (
                                <ul {...getMenuProps()}>
                                    {items.map((item, index) => (
                                        <li
                                            {...getItemProps({
                                                item,
                                                key: item.id,
                                                style: {
                                                    backgroundColor:
                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                },
                                            })}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                )}
            </Downshift>
        );
    }
}
export default Dropdown;
