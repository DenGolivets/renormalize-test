import OrderTable from "@/components/tableBody/OrderTable";
import TableHeader from "@/components/tableHeader/TableHeader";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white dark:bg-dark-custom">
      <TableHeader />
      <OrderTable />
    </main>
  );
}
