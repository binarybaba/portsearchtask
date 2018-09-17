import React, { Component } from 'react';
import Downshift from 'downshift';
import { Port, Ports } from '../../../Landing/SelectPorts/Styled/Components';

class Dropdown extends Component { // eslint-disable-line

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
                                onKeyDown: () => console.log(selectedItem),

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
                                            backgroundColor: highlightedIndex === index ? '#212121' : '#fafafa',
                                            color: highlightedIndex === index ? '#fafafa' : '#212121',
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
