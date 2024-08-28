import { useEffect, useState } from "react";

import { WeekdayEnum } from "../types";

type WeekNumber = `week${number}`;

interface Activity {
  weekday: WeekdayEnum;
  title: string;
  completed: boolean;
}

type Week = Array<Activity>;

type Plan = Record<WeekNumber, Week>;

interface ProgramFetcher {
  loading: boolean;
  program?: Plan;
  error?: Error;
}

function useFetchProgramData(): ProgramFetcher {
  const [data, setData] = useState<ProgramFetcher>({
    loading: true,
  });

  useEffect(() => {
    const f = async () => {
      try {
        const res = await fetch("/program.json");
        const json = await res.json();
        setData({ program: json, loading: false });
      } catch (error) {
        // TODO: handle actual error here
        setData({
          error: new Error(`an error occurred: ${error}`),
          loading: false,
        });
      }
    };
    f();
  }, []);

  return data;
}

export { useFetchProgramData };
