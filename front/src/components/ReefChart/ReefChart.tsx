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

export const ReefChart = (props: { values: DayValues[] }) => {
  const data: DayValues[] = props.values;

  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        maxHeight={300}
        minHeight={200}
      >
        <LineChart
          data={data}
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
