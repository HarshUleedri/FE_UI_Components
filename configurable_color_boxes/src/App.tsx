import { useState } from "react";
import ConfigurableBox, {
  type ConfigurableBoxType,
} from "./components/ConfigurableBox";

const App = () => {
  const value: ConfigurableBoxType[] = [
    {
      width: "33.33%",
      color: "red",
    },
    {
      width: "33.33%",
      color: "green",
    },
    {
      width: "33.33%",
      color: "pink",
    },
    {
      width: "50%",
      color: "black",
    },
    {
      width: "50%",
      color: "yellow",
    },
    {
      width: "70%",
      color: "blue",
    },
    {
      width: "30%",
      color: "orange",
    },
  ];

  const [data, setData] = useState<ConfigurableBoxType[]>(value);
  const [color, setColor] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addBox = () => {
    if (!color || !width) {
      setError("Every field is required");
      return;
    }

    setData((prev) => [...prev, { width: `${width}%`, color }]);
    setColor("");
    setWidth("");
    setError("");
  };

  console.log(data);

  return (
    <div className="flex flex-col gap-12 mx-auto max-w-6xl w-full my-10 items-center ">
      <h1 className="text-3xl font-semibold">Configurable Box</h1>

      <hr className=" w-full" />

      <div className="p-4  w-fit border rounded-md">
        <div className=" flex gap-8">
          <label className="flex flex-col gap-2  ">
            <span className="text-lg font-semibold">Width</span>
            <input
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="add width in percentage "
              className="border rounded px-4 py-1 border-gray-400"
            />
          </label>
          <label className="flex flex-col gap-2  ">
            <span className="text-lg font-semibold">Color</span>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="add color "
              className="border rounded px-4 py-1 border-gray-400"
            />
          </label>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <button
          onClick={addBox}
          className="bg-black text-white mt-4 px-4 rounded-md font-medium py-1"
        >
          Add Box
        </button>
      </div>

      <div className="flex w-full  justify-between space-y-4 flex-wrap">
        <ConfigurableBox data={data} />
      </div>
    </div>
  );
};

export default App;
