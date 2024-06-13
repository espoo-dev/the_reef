export type RangeSensor = {
  id: number;
  name: string;
  description: string;
  current_numeric_value: RangeValue;
  numeric_values: RangeValue[];
  max_value: string;
  min_value: string;
};

export type RangeValue = {
  created_at: string;
  id: number;
  value: string;
};
