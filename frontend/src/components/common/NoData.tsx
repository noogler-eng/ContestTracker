export default function NoData({ message }: { message: string }) {
  return (
    <div className="text-center py-12 bg-[#1A1A1A] rounded-lg border border-[#3E3E3E]">
      <p className="text-gray-400">{message}</p>
    </div>
  );
}
