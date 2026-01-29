export interface ConfigurableBoxType {
  width: string;
  color: string;
}

const ConfigurableBox = ({ data }: { data: ConfigurableBoxType[] }) => {
  return (
    <>
      {data.map((item, idx) => (
        <div
          style={{
            width: item.width,
            background: item.color,
          }}
          key={idx}
          className="h-44"
        ></div>
      ))}
    </>
  );
};

export default ConfigurableBox;
