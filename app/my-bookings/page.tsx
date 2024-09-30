"use client" // Mark the component as a Client Component

import { useState, useEffect } from "react"
import MyBookingClient from "@/components/booking/MyBookingsClient"
import axios from "axios" // Using axios to fetch data from an API

const MyBookings = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [bookingsFromVisitors, setBookingsFromVisitors] = useState([])
	const [bookingsIHaveMade, setBookingsIHaveMade] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch the bookings via API or some client-side data fetching logic
				const [visitorsBookingsRes, myBookingsRes] = await Promise.all([
					axios.get("/api/bookings/visitors"), // Adjust this endpoint as needed
					axios.get("/api/bookings/mine"),
				])

				setBookingsFromVisitors(visitorsBookingsRes.data || [])
				setBookingsIHaveMade(myBookingsRes.data || [])
			} catch (err) {
				console.error("Error fetching bookings:", err)
				setError("Failed to load bookings")
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <div>Loading bookings...</div>
	if (error) return <div>{error}</div>

	return (
		<div className="flex flex-col gap-10">
			{bookingsIHaveMade.length > 0 && (
				<div>
					<h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">Here are bookings you have made</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{bookingsIHaveMade.map((booking) => (
							<MyBookingClient key={booking.id} booking={booking} />
						))}
					</div>
				</div>
			)}
			{bookingsFromVisitors.length > 0 && (
				<div>
					<h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">Here are bookings visitors have made on your properties</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{bookingsFromVisitors.map((booking) => (
							<MyBookingClient key={booking.id} booking={booking} />
						))}
					</div>
				</div>
			)}
			{bookingsIHaveMade.length === 0 && bookingsFromVisitors.length === 0 && <div>No bookings found</div>}
		</div>
	)
}

export default MyBookings
