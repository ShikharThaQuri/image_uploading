import Image from "next/image";
import From from "./from";
import Gallery from "./gallery";
import axios from "axios";
const getData = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000//api/photo");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <From />
      <Gallery data={data} />
    </div>
  );
}
