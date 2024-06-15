export type RangeSensor = {
  id: number;
  name: string;
  description: string;
  current_numeric_value: RangeValue;
  numeric_values: RangeValue[];
  max_value: string;
  min_value: string;
  numeric_value_on_range: boolean;
  numeric_value_under_range: boolean;
  numeric_value_over_range: boolean;
};

export type RangeValue = {
  created_at: string;
  id: number;
  value: string;
};
