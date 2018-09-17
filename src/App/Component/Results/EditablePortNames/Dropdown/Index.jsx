import React, { Component } from 'react';
import Downshift from 'downshift';
import { Port, Ports } from '../../../shared/Components';
import { PRIMARY_COLOR, SUBTLE_BACKGROUND_COLOR } from '../../../../CONSTANT';

class Dropdown extends Component {
    state = {
        items: [],
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

    handleDownshiftInputChange(e) {
        this.handleQueryChange(e.target.value);
    }

    render() {
        const {
            defaultSelectedItem,
            onSelect,
        } = this.props;
        const { items } = this.state;
        return (
            <Downshift
                itemToString={item => (item ? `${item.name}` : '')}
                onChange={selection => onSelect(selection)}
                defaultSelectedItem={defaultSelectedItem}
            >
                {({
                      getInputProps,
                      getMenuProps,
                      getItemProps,
                      isOpen,
                      highlightedIndex,
                      selectedItem,
                  }) => (
                    <div>
                        <input
                            type="text"
                            {...getInputProps({
                                onChange: this.handleDownshiftInputChange.bind(this),
                            })}
                        />
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
                    </div>
                )}
            </Downshift>
        );
    }
}

export default Dropdown;
