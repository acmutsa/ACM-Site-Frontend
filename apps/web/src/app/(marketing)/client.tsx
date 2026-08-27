"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function WeArePhotoGrid() {
	const photos = [
		"bag.png",
		"birdsup.png",
		"dinochess.jpg",
		"shock.jpg",
		"walrus.jpg",
		"dinogreen.jpg",
		"rhshirt.jpg",
	];
	const photoPrefix = "/img/photos/";
	const totalPhotos = photos.length;
	const gridSize = 4;
	const idleSeconds = 6;

	const [currentIndices, setCurrentIndices] = useState(() => {
		const initialIndices: number[] = [];
		for (let i = 0; i < gridSize; i++) {
			let nextIndex = i % totalPhotos;
			while (initialIndices.includes(nextIndex)) {
				nextIndex = (nextIndex + 1) % totalPhotos;
			}
			initialIndices.push(nextIndex);
		}
		return initialIndices;
	});

	const variants = [
		{ initial: { y: "100%" }, exit: { x: "100%" } },
		{ initial: { x: "-100%" }, exit: { y: "100%" } },
		{ initial: { x: "100%" }, exit: { y: "-100%" } },
		{ initial: { y: "-100%" }, exit: { x: "-100%" } },
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndices((prevIndices) => {
				const nextIndices = [
					(prevIndices[2] + 1) % totalPhotos,
					(prevIndices[0] + 1) % totalPhotos,
					(prevIndices[3] + 1) % totalPhotos,
					(prevIndices[1] + 1) % totalPhotos,
				];

				for (let i = 0; i < gridSize; i++) {
					for (let j = 0; j < i; j++) {
						if (nextIndices[i] === nextIndices[j]) {
							nextIndices[i] = (nextIndices[i] + 1) % totalPhotos;
							j = -1;
						}
					}

					if (nextIndices[i] === prevIndices[i]) {
						nextIndices[i] = (nextIndices[i] + 1) % totalPhotos;
						for (let j = 0; j < i; j++) {
							if (nextIndices[i] === nextIndices[j]) {
								nextIndices[i] = (nextIndices[i] + 1) % totalPhotos;
								j = -1;
							}
						}
					}
				}

				return nextIndices;
			});
		}, idleSeconds * 1000);

		return () => clearInterval(interval);
	}, [totalPhotos]);

	return (
		<>
			{[0, 1, 2, 3].map((i) => (
				<div
					key={i}
					className="relative h-full w-full min-h-0 min-w-0 overflow-hidden border border-acm-darker-blue/50"
				>
					<AnimatePresence initial={false}>
						<motion.div
							key={currentIndices[i]}
							className="absolute inset-0 flex items-center justify-center p-4"
							initial={variants[i].initial}
							animate={{ x: 0, y: 0 }}
							exit={variants[i].exit}
							transition={{ duration: 0.7, ease: "easeInOut" }}
						>
							<div className="relative h-full w-full">
								<Image
									src={`${photoPrefix}${photos[currentIndices[i]]}`}
									alt={`ACM photo ${currentIndices[i] + 1}`}
									fill
									sizes="(max-width: 768px) 50vw, 25vw"
									className="rounded-lg object-cover"
									priority={i < gridSize}
								/>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			))}
		</>
	);
}