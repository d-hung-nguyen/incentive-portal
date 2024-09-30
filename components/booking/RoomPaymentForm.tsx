"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import useBookRoom from "@/hooks/useBookRoom" // Custom hook for booking logic
import { useToast } from "../ui/use-toast"

interface RoomPaymentFormProps {
	handleSetBookingSuccess: (value: boolean) => void
}

const RoomPaymentForm: React.FC<RoomPaymentFormProps> = ({ handleSetBookingSuccess }) => {
	const { bookingRoomData } = useBookRoom()
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// Assuming you have an API route to handle booking submissions
			const res = await fetch("/api/book-room", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ bookingRoomData }),
			})

			if (res.ok) {
				handleSetBookingSuccess(true)
				toast({
					variant: "success",
					description: "🎉 Booking Successful!",
				})
			} else {
				throw new Error("Booking failed")
			}
		} catch (error) {
			toast({
				variant: "destructive",
				description: `Error: ${error.message}`,
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex justify-between">
				<Button disabled={isLoading} type="submit">
					{isLoading ? "Processing..." : "Confirm Booking"}
				</Button>
				<Button variant="outline" onClick={() => router.push("/")}>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default RoomPaymentForm
