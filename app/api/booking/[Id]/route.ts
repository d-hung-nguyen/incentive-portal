import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

// PATCH: Update booking status or details
export async function PATCH(req: Request, { params }: { params: { Id: string } }) {
	try {
		const { userId } = auth()

		if (!params.Id) {
			return new NextResponse("Booking Id is required", { status: 400 })
		}

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const { status } = await req.json()

		const booking = await prismadb.booking.update({
			where: {
				id: params.Id,
			},
			data: { status },
		})

		return NextResponse.json(booking)
	} catch (error) {
		console.log("Error at /api/booking/Id PATCH", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

// DELETE: Delete booking by Id
export async function DELETE(req: Request, { params }: { params: { Id: string } }) {
	try {
		const { userId } = auth()

		if (!params.Id) {
			return new NextResponse("Booking Id is required", { status: 400 })
		}

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const booking = await prismadb.booking.delete({
			where: {
				id: params.Id,
			},
		})

		return NextResponse.json(booking)
	} catch (error) {
		console.log("Error at /api/booking/Id DELETE", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

// GET: Fetch bookings for a room by Id
export async function GET(req: Request, { params }: { params: { Id: string } }) {
	try {
		const { userId } = auth()

		if (!params.Id) {
			return new NextResponse("Room Id is required", { status: 400 })
		}

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)

		const bookings = await prismadb.booking.findMany({
			where: {
				roomId: params.Id,
				endDate: {
					gt: yesterday,
				},
			},
		})

		return NextResponse.json(bookings)
	} catch (error) {
		console.log("Error at /api/booking/Id GET", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

// POST: Create a new booking without payment
export async function POST(req: Request) {
	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const { roomId, startDate, endDate, totalPrice, breakFastIncluded } = await req.json()

		if (!roomId || !startDate || !endDate || !totalPrice) {
			return new NextResponse("Missing required fields", { status: 400 })
		}

		const newBooking = await prismadb.booking.create({
			data: {
				roomId,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				totalPrice,
				breakFastIncluded,
				userId,
				status: "confirmed", // Mark as confirmed since no payment is involved
			},
		})

		return NextResponse.json(newBooking)
	} catch (error) {
		console.log("Error at /api/booking POST", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
