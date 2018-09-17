import React, { Component } from 'react';
import Downshift from 'downshift';

import {
    Ports,
    Port,
} from '../../../../shared/Components';
import { PRIMARY_COLOR, SUBTLE_BACKGROUND_COLOR } from '../../../../../CONSTANT';

class Dropdown extends Component {
    state = {
        items: [],
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

    render() {
        const { items } = this.state;
        const { onSelect, onClearSelection, placeholder } = this.props;
        return (
            <Downshift
                itemToString={item => (item ? `${item.name} (${item.id})` : '')}
                onChange={selection => onSelect(selection)}
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
                                placeholder,
                            })}
                        />
                        <button
                            type="button"
                            disabled={!selectedItem}
                            onClick={() => clearSelection(() => onClearSelection())}
                        >
                            <i className="fas fa-2x fa-times" />
                        </button>
                        {
                            <Ports opened={isOpen} {...getMenuProps()}>
                                {items.map((item, index) => (
                                    <Port
                                        isHighlighted={highlightedIndex === index}
                                        isSelected={selectedItem === item}
                                        {...getItemProps({
                                            item,
                                            key: item.id,
                                            style: {
                                                backgroundColor: highlightedIndex === index
                                                    ? PRIMARY_COLOR : SUBTLE_BACKGROUND_COLOR,
                                                color: highlightedIndex === index
                                                    ? SUBTLE_BACKGROUND_COLOR : PRIMARY_COLOR,
                                            },
                                        })}
                                    >
                                        <div>
                                            <h1>{item.name}</h1>
                                            <h2>{item.country}</h2>
                                        </div>
                                    </Port>
                                ))}
                            </Ports>
                        }
                    </div>
                )}
            </Downshift>
        );
    }
}
export default Dropdown;
