import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface AveragesProp {
  averageData: Array<{
    gameId: string;
    averageDuration: number;
  }>;
}

const Averages: React.FC<AveragesProp> = ({ averageData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={averageData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gameId" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="averageDuration" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Averages;
