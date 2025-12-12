import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface TopPieProp {
  top3Data: Array<{
    gameId: number;
    name: string;
    totalMinutes: number;
  }>;
}

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981"]; // tweak for your OKLCH palette

const TopPie: React.FC<TopPieProp> = ({ top3Data }) => {
  return (
    <PieChart width={350} height={300}>
      <Pie
        data={top3Data}
        dataKey="totalMinutes"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {top3Data.map((entry, index) => (
          <Cell key={entry.gameId} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TopPie;
