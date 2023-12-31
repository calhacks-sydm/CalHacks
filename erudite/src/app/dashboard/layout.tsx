import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
children: React.ReactNode
}) {
return (
    <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Navbar />
        <Separator />
        
        {children}
    </section>
)
}