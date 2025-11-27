/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Required for useState/useEffect
import { useState, useEffect } from "react";
import Image from "next/image";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { getHomePage } from "@/data/loaders";

export default function HeroSections() {
	// Replace 'any' with the Type interface if available
	const [home, setHome] = useState<any>(null);

	useEffect(() => {
		async function load() {
			const data = await getHomePage();
			setHome(data.data);
		}
		load();
	}, []);

	if (!home) return <div>Loading...</div>;

	const blocks = home.blocks || [];

	// Find the hero section
	const hero = blocks.find((b: any) =>
		b.__component === "layout.hero-section"
	);

	const imageUrl = hero?.image?.url ? getStrapiURL(hero.image.url) : null;

	return (
		<section className="relative h-[90vh] w-full">
			{/* Container */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				{imageUrl && (
					<>
						<Image
							src={imageUrl}
							alt={hero?.image?.alternativeText || "Hero Image"}
							className="absolute inset-0 w-full h-full object-cover"
							fill
							priority
							unoptimized={true}
						/>

						{/* Modern Gradient Overlay: Improves text readability and blends bottom */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
					</>
				)}
			</div>
		</section>
	);
}
