import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
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
        maxHeight={450}
        minHeight={350}
      >
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" />
          <YAxis type="number" domain={['auto', 'auto']} />
          <Tooltip contentStyle={{ color: '#000' }} />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            stroke="red"
            fill="#db0012"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReefChart;
