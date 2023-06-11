import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
} from 'recharts';

export const ReefChartHistoric = (params: {
  data: Array<{ hour: string; yesterday: number; today: number }>;
}) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      maxHeight={250}
      minHeight={150}
    >
      <BarChart
        data={params.data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="hour" interval={2} />
        <Tooltip
          contentStyle={{
            color: '#000',
          }}
        />
        <Bar
          type="monotone"
          dataKey="yesterday"
          stroke="#fab6a0"
          fill="#fab6a0"
        />
        <Bar
          animationBegin={3}
          type="monotone"
          dataKey="today"
          stroke="red"
          fill="red"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReefChartHistoric;
