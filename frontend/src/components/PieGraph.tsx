import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#D81B60", "#1E88E5", "#FFC107", "#C03CDA"]; // add more if needed

interface PieGraphProp {
  graphData: Array<{
    key: string;
    value: number;
  }>;
}

const PieGraph: React.FC<PieGraphProp> = ({ graphData }) => {
  const totalMinutes = graphData.reduce((sum, s) => sum + s.value, 0);

  const data = graphData.map((s) => ({
    name: s.key,
    value: s.value, // raw minutes
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={(entry) =>
          `${entry.name}: ${((entry.value / totalMinutes) * 100).toFixed(1)}%`
        }
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieGraph;
