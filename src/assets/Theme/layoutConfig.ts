export const Layouts = {
  lg: [
    {
      w: 28,
      h: 50,
      x: 0,
      y: 0,
      i: "market",
      minH: 5,
      minW: 28
    },
    {
      w: 85,
      h: 50,
      x: 28,
      y: 5,
      minH: 30,
      i: "chart",
      minW: 45
    },
    {
      w: 27,
      h: 50,
      x: 113,
      y: 0,
      minH: 20,
      minW: 20,
      i: "orderBook"
    }
  ],
  md: [

    {
      maxW: 60,
      h: 50,
      x: 28,
      y: 0,
      minH: 30,
      i: "chart",
      minW: 45
    },
    {
      w: 27,
      h: 50,
      x: 113,
      y: 0,
      minH: 20,
      minW: 20,
      i: "orderBook"
    },

    {
      w: 140,
      h: 34,
      x: 0,
      y: 50,
      minH: 15,
      minW: 100,
      i: "userActivities"
    }
  ],
  sm: [
    {
      w: 100,
      h: 50,
      x: 0,
      y: 0,
      i: "chart",
      minW: 45,
      minH: 30
    },
    {
      w: 100,
      h: 30,
      x: 0,
      y: 37,
      i: "orderBook",
      minH: 20,
      minW: 20
    }
  ],
  sx: [
    {
      w: 100,
      h: 50,
      x: 0,
      y: 0,
      i: "chart",
      minW: 45,
      minH: 30
    },
    {
      w: 100,
      h: 30,
      x: 0,
      y: 37,
      i: "orderBook",
      minH: 20,
      minW: 20
    }
  ],
};
export const addChartData = ({ currentLayout, compName, DefaultLayout }: { currentLayout: any; compName: string; DefaultLayout: any }) => {
  const newlayout = { ...currentLayout };
  for (const size in newlayout) {
    const l = DefaultLayout[size].filter((item: { i: string }) => item.i === compName);
    newlayout[size] = [...newlayout[size], ...l];
  }

  return newlayout;
};
export const removeChartData = (layouts: any, payload: string) => {
  const newlayout = { ...layouts };
  // Loop through each layout size (lg, md, sm, xs)
  for (const size in layouts) {
    // Filter out chart data from the current size layout
    newlayout[size] = newlayout[size].filter((item: { i: string }) => item.i !== payload);
  }

  return newlayout;
};
export const Components = ["marketSegment", "orderForm", "chart", "orderBook", "userActivities"];
