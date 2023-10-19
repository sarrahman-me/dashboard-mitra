"use client";
import { useEffect, useState } from "react";
import Autocomplete from "../Autocomplete";
import { GetDataApi } from "@/utils";

interface AutocompleteApiProps {
  setValue: (item: string) => void;
  value: any;
  endpointData: string;
  keyValue: {
    key: string;
    value: string;
  };
}

const AutocompleteApi = ({
  keyValue,
  endpointData,
  value,
  setValue,
}: AutocompleteApiProps) => {
  const [data, setData] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi(endpointData);
      setData(response.data);
    };
    fetchData();
  }, [endpointData]);

  return (
    <div>
      <Autocomplete
        value={value}
        setValue={setValue}
        lists={data}
        keyValue={keyValue}
      />
    </div>
  );
};

export default AutocompleteApi;
