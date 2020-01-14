import React, { forwardRef } from 'react';
import { InputNumber } from 'antd';

interface RoomPaxProps {
  value?: {
    adultCount: number;
    childCount: number;
    childAges: number[];
  };
  onChange?: (arg: Partial<RoomPaxProps['value']>) => void;
}

const updateChildAges = (baseValue: number[] = [], idx: number, value: number) => {
  const retValue = !baseValue ? [] : [...baseValue];
  retValue[idx] = value;
  return retValue;
};

const RoomPaxInput: React.FC<RoomPaxProps> = props => {
  const inputNumberOnChangeFor = React.useCallback(
    (k: string, idx: number = 0) => (arg: any) => {
      if (props.onChange) {
        switch (k) {
          case 'childAges':
            return props.onChange({
              ...props.value,
              childAges: updateChildAges(props.value?.childAges, idx, arg),
            });
          default:
            return props.onChange({ ...props.value, [k]: arg });
        }
      }
      return undefined;
    },
    [props.value],
  );

  return (
    <div>
      <span>Adult</span>
      <InputNumber
        min={1}
        onChange={inputNumberOnChangeFor('adultCount')}
        value={props.value?.adultCount || 1}
      />
      <span>Child</span>
      <InputNumber
        min={0}
        max={3}
        onChange={inputNumberOnChangeFor('childCount')}
        value={props.value?.childCount || 0}
      />
      {props.value && props.value.childCount > 0 ? (
        <>
          <span>Child Ages</span>
          {[...Array(props.value?.childCount).keys()].map(i => (
            <span key={i}>
              <InputNumber
                min={1}
                max={12}
                onChange={inputNumberOnChangeFor('childAges', i)}
                value={props.value?.childAges[i] || 5}
              />
            </span>
          ))}
        </>
      ) : (
        undefined
      )}
    </div>
  );
};

export default forwardRef(RoomPaxInput);
