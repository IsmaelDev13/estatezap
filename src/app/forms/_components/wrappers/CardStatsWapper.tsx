"use client";
import { trpc } from "@/app/_trpc/client";
import { StatsCard } from "../cards/StatsCard";
import {
  View,
  FolderSymlink,
  TextCursor,
  ArrowBigDown,
  Loader2,
} from "lucide-react";

function CardStatsWrapper() {
  const { data: stats, isLoading } = trpc.getFormStats.useQuery();

  console.log(stats);

  return <StatsWrapper loading={isLoading} data={stats!} />;
}
export default CardStatsWrapper;

interface StatsWrapperProps {
  data: {
    visits: number;
    submissions: number;
    submissionsRate: number;
    bounceRate: number;
  };
  loading: boolean;
}

function StatsWrapper({ data, loading }: StatsWrapperProps) {
  if (loading)
    return (
      <div className="flex flex-col">
        <Loader2 className="animate-spin h-5 w-5" />
      </div>
    );
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<View className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md"
      />
      <StatsCard
        title="Total submissions"
        icon={<FolderSymlink />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md"
      />
      <StatsCard
        title="Submission rate"
        icon={<TextCursor />}
        helperText="Visits that result in form submission"
        value={data?.submissionsRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md "
      />
      <StatsCard
        title="Bounce rate"
        icon={<ArrowBigDown className="text-red-600" />}
        helperText="Visits that leave without interacting"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}
