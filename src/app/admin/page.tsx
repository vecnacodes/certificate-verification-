import AdminDashboard from '@/components/ui/AdminDashboard'

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  )
}