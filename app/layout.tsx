import type { Metadata } from "next"

import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import NavBar from "@/components/layout/NavBar"
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/Container"
import { Toaster } from "@/components/ui/toaster"
import LocationFilter from "@/components/LocationFilter"
import localFont from "next/font/local"

// Font files can be colocated inside of `pages`
const alta = localFont({ src: "./fonts/Alta_regular.otf" })

export const metadata: Metadata = {
	title: "Agent Incentive Program",
	description: "Book a hotel of your choice",
	icons: { icon: "/1.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<Toaster />
						<main className={alta.className}>
							<NavBar />
							<LocationFilter />
							<section className="flex-grow">
								<Container>{children}</Container>
							</section>
						</main>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
