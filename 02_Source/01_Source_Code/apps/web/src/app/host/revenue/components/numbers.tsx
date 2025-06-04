"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Grid } from "@/components/layout/grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/features/auth/contexts/UserContext";
import { useHostNumbers } from "@/features/reporting/hooks/use-host-numbers";
import { formatPrice } from "@/lib/utils";

const getMonthText = (month: number) => {
  const date = new Date(0);
  date.setUTCMonth(month);
  return date.toLocaleString("default", { month: "short" });
};
const chartConfig = {
  value: {
    label: "Value",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function Numbers() {
  const host = useUserContext();
  const { isLoading, data: numbers } = useHostNumbers(host.id);

  if (isLoading) {
    return (
      <Grid className="grid-cols-3 gap-6">
        <Skeleton className="h-[288px] rounded-xl" />
        <Skeleton className="h-[288px] rounded-xl" />
        <Skeleton className="h-[288px] rounded-xl" />
      </Grid>
    );
  }

  if (!numbers) {
    return null;
  }

  return (
    <Grid className="grid-cols-3 gap-6">
      <Number
        title="Total Listings"
        description="Total number of listings"
        number={numbers.numberOfListings}
      >
        <ChartContainer config={chartConfig} className="h-32 w-full">
          <LineChart
            accessibilityLayer
            data={numbers.numberOfListingsByMonth}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={getMonthText}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Number>
      <Number
        title="Total Reservations"
        description="Total number of reservations"
        number={numbers.numberOfReservations}
      >
        <ChartContainer config={chartConfig} className="h-32 w-full">
          <LineChart
            accessibilityLayer
            data={numbers.numberOfReservationsByMonth}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={getMonthText}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Number>
      <Number
        title="Total Revenue"
        description="Total revenue generated from all listings"
        number={formatPrice(numbers.totalRevenue)}
      >
        <ChartContainer config={chartConfig} className="h-32 w-full">
          <LineChart
            accessibilityLayer
            data={numbers.revenueByMonth}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={getMonthText}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Number>
    </Grid>
  );
}

function Number({
  children,
  title,
  description,
  number,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  number: string | number;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const formattedNumber =
    typeof number === "number" ? formatter.format(number) : number;
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="sr-only">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-semibold">{formattedNumber}</span>
      </CardContent>
      <div className="p-4">{children}</div>
    </Card>
  );
}
