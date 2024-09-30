"use client"

import useBookRoom from "@/hooks/useBookRoom"
import RoomCard from "../room/RoomCard"
import RoomPaymentForm from "./RoomPaymentForm" // Adapted to handle bookings without payment
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const BookRoomClient = () => {
	const { bookingRoomData } = useBookRoom()
	const [bookingSuccess, setBookingSuccess] = useState(false)
	const [pageLoaded, setPageLoaded] = useState(false)
	const { theme } = useTheme()
	const router = useRouter()

	useEffect(() => {
		setPageLoaded(true)
	}, [])

	const handleSetBookingSuccess = (value: boolean) => {
		setBookingSuccess(value)
	}

	if (pageLoaded && !bookingSuccess && !bookingRoomData)
		return (
			<div className="flex items-center flex-col gap-4">
				<div className="text-rose-500">Oops! This page could not be properly loaded...</div>
				<div className="flex items-center gap-4">
					<Button variant="outline" onClick={() => router.push("/")}>
						Go Home
					</Button>
					<Button onClick={() => router.push("/my-bookings")}>View My Bookings</Button>
				</div>
			</div>
		)

	if (bookingSuccess)
		return (
			<div className="flex items-center flex-col gap-4">
				<div className="text-teal-500 text-center">Booking Success</div>
				<Button onClick={() => router.push("/my-bookings")}>View My Bookings</Button>
			</div>
		)

	return (
		<div className="max-w-[700px] mx-auto">
			{bookingRoomData && (
				<div>
					<h3 className="text-2xl font-semibold mb-6">Complete your room booking!</h3>
					<div className="mb-6">
						<RoomCard room={bookingRoomData.room} />
					</div>
					{/* Booking form, adapted to handle bookings without payments */}
					<RoomPaymentForm handleSetBookingSuccess={handleSetBookingSuccess} />
				</div>
			)}
		</div>
	)
}

export default BookRoomClient
