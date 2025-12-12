import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarGraphProp {
  graphData: Array<{
    key: string;
    value: number;
  }>;
}

const BarGraph: React.FC<BarGraphProp> = ({ graphData }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart layout="vertical" data={graphData}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="key" />
          <Tooltip />
          <Bar dataKey="value" fill="#1E88E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
