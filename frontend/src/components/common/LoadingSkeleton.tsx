import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl shadow-lg"
        >
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              {/* Thumbnail Skeleton */}
              <Skeleton className="w-full h-40 rounded-lg bg-[#2A2A2A]" />

              {/* Title Skeleton */}
              <Skeleton className="h-6 w-3/4 bg-[#2A2A2A]" />

              {/* Platform/Time Skeleton */}
              <Skeleton className="h-4 w-1/2 bg-[#2A2A2A]" />

              {/* Tags / Stats Skeleton */}
              <div className="flex gap-2">
                <Skeleton className="h-4 w-1/3 bg-[#2A2A2A]" />
                <Skeleton className="h-4 w-1/3 bg-[#2A2A2A]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
