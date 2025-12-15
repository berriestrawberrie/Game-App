import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface LineChartProp {
  lineData: Array<{
    date: string;
    totalDuration: number;
  }>;
}

const LineGraph: React.FC<LineChartProp> = ({ lineData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={lineData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="totalDuration"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
