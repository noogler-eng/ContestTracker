import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="bg-[#1A1A1A] border-[#3E3E3E]">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Skeleton className="w-16 h-16 rounded-md bg-[#2A2A2A]" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 bg-[#2A2A2A]" />
                <Skeleton className="h-4 w-1/4 bg-[#2A2A2A]" />
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Skeleton className="h-4 w-full bg-[#2A2A2A]" />
                  <Skeleton className="h-4 w-2/3 bg-[#2A2A2A]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
