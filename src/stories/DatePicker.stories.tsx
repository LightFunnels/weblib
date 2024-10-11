import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatePicker, RangeDatePicker } from '../components/date';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Date',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    error: { control: 'text' },
    displayFormat: { control: 'text' },
    popperPlacement: {
      control: 'select',
      options: ['top-start', 'bottom'],
    },
    clearable: { control: 'boolean' },
    maxDate: { control: 'date' },
    minDate: { control: 'date' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    value: null,
    clearable: true,
  },
};

export const WithValue: Story = {
  args: {
    value: '2023-05-15 00:00:00',
    clearable: true,
  },
};

export const WithError: Story = {
  args: {
    value: '2023-05-15 00:00:00',
    error: 'Invalid date',
    clearable: true,
  },
};

export const CustomFormat: Story = {
  args: {
    value: '2023-05-15 00:00:00',
    displayFormat: 'dd/mm/yyyy',
    clearable: true,
  },
};

export const RangePicker: StoryObj<typeof RangeDatePicker> = {
  render: () => {
    const [dateRange, setDateRange] = React.useState({
      startDate: null,
      endDate: null,
    });

    return (
      <RangeDatePicker
        value={dateRange}
        onChange={setDateRange}
        clearable={true}
      />
    );
  },
};

export const RangePickerWithValue: StoryObj<typeof RangeDatePicker> = {
  render: () => {
    const [dateRange, setDateRange] = React.useState({
      startDate: '2023-05-01 00:00:00',
      endDate: '2023-05-15 23:59:59',
    });

    return (
      <RangeDatePicker
        value={dateRange}
        onChange={setDateRange}
        clearable={true}
      />
    );
  },
};

export const InteractiveDatePicker: Story = {
  render: () => {
    const [date, setDate] = React.useState<string | null>(null);

    return (
      <DatePicker
        value={date}
        onChange={setDate}
        clearable={true}
      />
    );
  },
};

export const InteractiveRangePicker: StoryObj<typeof RangeDatePicker> = {
  render: () => {
    const [dateRange, setDateRange] = React.useState({
      startDate: null,
      endDate: null,
    });

    return (
      <div>
        <RangeDatePicker
          value={dateRange}
          onChange={setDateRange}
          clearable={true}
        />
        <p>Start Date: {dateRange.startDate || 'Not selected'}</p>
        <p>End Date: {dateRange.endDate || 'Not selected'}</p>
      </div>
    );
  },
};
