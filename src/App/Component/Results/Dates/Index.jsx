import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { MIN_FROM_DATE, MAX_TO_DATE, DATE_SELECTOR_NUMBER_OF_MONTHS } from '../../../CONSTANT';

class Dates extends Component {
    state={};

    componentDidMount() {
        const { from, to } = this.props;
        this.setState(() => ({ from: new Date(from), to: new Date(to) }));
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        const { setDateRange } = this.props;
        this.setState(range);
        if (setDateRange) {
            setDateRange({ ...range });
        }
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (
            <DayPicker
                className="Selectable"
                month={from ? new Date(from.getFullYear(), from.getMonth()) : null}
                numberOfMonths={DATE_SELECTOR_NUMBER_OF_MONTHS}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={day => this.handleDayClick(day)}
                disabledDays={{ after: MAX_TO_DATE, before: MIN_FROM_DATE }}
            />
        );
    }
}

export default Dates;
