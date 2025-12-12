import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface TopPlayerProp {
  playerData: Array<{
    firstName: string;
    lastName: string;
    totalDuration: number;
  }>;
}

const TopPlayers: React.FC<TopPlayerProp> = ({ playerData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={playerData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="firstName" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalDuration" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopPlayers;
