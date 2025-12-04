interface Props {
  option: string;
}

const Blank: React.FC<Props> = ({ option }) => {
  return <>{option}</>;
};

export default Blank;
