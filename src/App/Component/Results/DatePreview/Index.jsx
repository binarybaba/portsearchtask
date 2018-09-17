import React, { Component } from 'react';
import { stringDateToHuman } from '../Util';
import {
    DatesPreviewWrapper,
    DatesPreviewButton,
    Date,
    DateSelectorWrapper,
} from '../Styled/Components';

class DatePreview extends Component { // eslint-disable-line
    state = {
        showDateSelector: false,
    };

    componentDidMount() {
        window.addEventListener('click', this.handleWindowClick);
    }

    // because we want the date preview to close if if the user clicks outside the box
    handleWindowClick = (e) => { // eslint-disable-line
        if (e.target.className) {
            try {
                if (e.target.className.includes('DayPicker')) {
                    return null;
                }
                return this.setState(() => ({ showDateSelector: false }));
            } catch (er) {
                return this.setState(() => ({ showDateSelector: false }));
            }
        }
        this.setState(() => ({ showDateSelector: false }));
    };

    toggleDateSelector() {
        this.setState(prevState => ({ showDateSelector: !prevState.showDateSelector }));
    }

    render() {
        const { from, to, render } = this.props;
        const { showDateSelector } = this.state;
        return (
            <DatesPreviewWrapper>
                <DatesPreviewButton className="DayPicker Button" isSelected={showDateSelector} type="button" onClick={() => this.toggleDateSelector()}>
                    <ul>
                        <Date className="DayPicker li">{stringDateToHuman(from)}</Date>
                        <Date className="DayPicker li"><i className="fas fa-arrow-right DayPicker li" /></Date>
                        <Date className="DayPicker li">{stringDateToHuman(to)}</Date>
                    </ul>
                </DatesPreviewButton>
                <DateSelectorWrapper showDateSelector={showDateSelector}>
                    {render()}
                </DateSelectorWrapper>
            </DatesPreviewWrapper>
        );
    }
}
export default DatePreview;
