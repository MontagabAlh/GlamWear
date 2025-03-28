import Cards from "@/components/Pages/Admin/Dashboard/Cards";
import RecentSales from "@/components/Pages/Admin/Dashboard/RecentSales";
import Transaction from "@/components/Pages/Admin/Dashboard/Transaction";

export default function Dashboard() {
  return (
    <>
      <Cards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Transaction />
        <RecentSales />
      </div>
    </>
  )
}
