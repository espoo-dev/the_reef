import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface DayValues {
  created_at: string;
  value: number;
}

const getFormattedDate = (date: Date): string => {
  return `${date.getDate()}/${
    date.getMonth() + 1
  } ${date.getHours()}:${date.getMinutes()}`;
};

export const ReefChartList = (props: { values: DayValues[] }) => {
  const chartData = props.values.map((point) => {
    return {
      created_at: getFormattedDate(new Date(point.created_at)),
      value: point.value,
    };
  });

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      maxHeight={250}
      minHeight={150}
    >
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="created_at" interval={10} />
        <Tooltip
          contentStyle={{
            color: '#000',
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="red"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
