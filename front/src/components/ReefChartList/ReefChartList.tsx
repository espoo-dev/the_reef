import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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

export const ReefChartList = (props: { values: DayValues[] }) => {
  const chartData = props.values.map((point) => {
    return {
      created_at: getFormattedDate(new Date(point.created_at)),
      value: point.value,
    };
  });

  return (
    <div style={{ marginTop: 50 }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        maxHeight={300}
        minHeight={250}
      >
        <LineChart
          data={chartData}
          margin={{
            top: 50,
            right: 30,
            left: -30,
            bottom: 0,
          }}
        >
          <XAxis dataKey="created_at" />
          <YAxis type="number" domain={['auto', 'auto']} />
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
    </div>
  );
};
