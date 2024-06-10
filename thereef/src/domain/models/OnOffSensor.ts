export type OnOffSensor = {
  id: number;
  name: string;
  description: string;
  current_on_off_value: OnOffValue;
  on_off_values: OnOffValue[];
};

type OnOffValue = {
  created_at: string;
  id: number;
  value: boolean;
};
