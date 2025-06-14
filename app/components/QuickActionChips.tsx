import { Badge } from "@/components/ui/badge";

export default function QuickActionChips() {
    return (
        <div className="flex flex-row justify-center gap-6 w-full pt-2">
            <Badge variant='outline' className="px-4 py-1 shadow-lg">Park Now</Badge>
            <Badge variant='outline' className="px-4 py-1 shadow-lg">Reserve Later</Badge>
            <Badge variant='outline' className="px-4 py-1 shadow-lg">Near Airport</Badge>
            <Badge variant='outline' className="px-4 py-1 shadow-lg">Downtown</Badge>
        </div>
    )
}