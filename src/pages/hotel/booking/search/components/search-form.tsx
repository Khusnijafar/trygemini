import React from 'react';
import { Form, Select, DatePicker, InputNumber, Input, Button } from 'antd';
import { State } from '../model';
import RoomPaxInput from './room-pax-input';
import { FormComponentProps } from 'antd/es/form';

interface SearchFormProps extends FormComponentProps {
  initialValue: State['searchForm'];
  countries: Array<string[]>;
  destinations: Array<string[]>;
  validateFieldsHandler: (error: object, formValue: SearchFormProps['initialValue']) => void;
  destinationSearchHandler: (term: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = props => {
  const { getFieldDecorator, validateFields, getFieldValue } = props.form;
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        validateFields(props.validateFieldsHandler);
      }}
      layout="vertical"
    >
      <Form.Item label="Main Guest Nationality">
        {getFieldDecorator('nationality', {
          initialValue: props.initialValue.nationality,
          rules: [{ required: false }],
        })(
          <Select showSearch optionFilterProp="children" placeholder="Select a nationality">
            {props.countries.map(([v]) => (
              <Select.Option value={v} key={v}>
                {v}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>

      <Form.Item label="Destination or Hotel Name">
        {getFieldDecorator('destination', {
          initialValue: props.initialValue.destination,
          rules: [{ required: true }],
        })(
          <Select showSearch loading={false} onSearch={props.destinationSearchHandler}>
            {props.destinations.map(([v]) => (
              <Select.Option key={v} value={v}>
                {v}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>

      <Form.Item label="Check In & Check Out">
        {getFieldDecorator('stayDates', {
          initialValue: props.initialValue.stayDates,
          rules: [{ required: true }],
        })(<DatePicker.RangePicker />)}
      </Form.Item>

      <Form.Item label="Number Of Rooms">
        {getFieldDecorator('numberOfRooms', {
          initialValue: props.initialValue.numberOfRooms,
          rules: [{ required: true }],
        })(<InputNumber min={1} max={4} />)}
      </Form.Item>

      {[...Array(getFieldValue('numberOfRooms')).keys()].map(i => (
        <div key={`ROOM_${i}`}>
          <h1>Room {i + 1}</h1>
          <Form.Item label="Number of Paxes">
            {getFieldDecorator(`rooms[${i}]`, {
              initialValue: props.initialValue.rooms[i] || {
                roomNumber: i + 1,
                adultCount: 1,
                childCount: 0,
                childAges: [],
              },
            })(<RoomPaxInput />)}
          </Form.Item>
        </div>
      ))}

      <Form.Item label="Test input text box">
        {getFieldDecorator('testInputText')(<Input type="text" />)}
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Search
      </Button>
    </Form>
  );
};

export default Form.create<SearchFormProps>()(SearchForm);
