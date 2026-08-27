export default function DonatePage() {
	return (
		<div className="fixed inset-0">
			<iframe
				src="https://tally.so/r/dWjN1d?transparentBackground=1"
				className="h-full w-full border-0"
				title="Donate"
				suppressHydrationWarning
			/>
			<script src="https://tally.so/widgets/embed.js" async></script>
		</div>
	);
}
