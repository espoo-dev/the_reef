import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

export const ReefChart = (props: { values: DayValues[] }) => {
  const chartData = props.values.map((point) => {
    return {
      created_at: getFormattedDate(new Date(point.created_at)),
      value: point.value,
    };
  });

  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        maxHeight={300}
        minHeight={200}
      >
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" />
          <YAxis type="number" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              color: '#000',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="red"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReefChart;
