import { XAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export const ReefChart = (params: {
  data: [{ hour: string; yesterday: number; today: number }] | undefined;
}) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      maxHeight={450}
      minHeight={350}
    >
      <AreaChart
        data={params.data}
        margin={{
          top: 50,
          right: 30,
          left: 30,
          bottom: 0,
        }}
      >
        <XAxis dataKey="hour" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="yesterday"
          stroke="#c1c2de"
          fill="#c1c2de"
          activeDot={{ r: 8 }}
        />
        <Area
          type="monotone"
          dataKey="today"
          stroke="#0510eb"
          fill="#0510eb"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReefChart;
