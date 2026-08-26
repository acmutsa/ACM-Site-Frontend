import { fileURLToPath } from "node:url";
import createJiti from "jiti";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	serverExternalPackages: [
        "@libsql/client",
        "libsql",
        "@libsql/hrana-client",
        "@libsql/isomorphic-fetch",
        "@libsql/isomorphic-ws",
    ],
	images: {
		// fix image optmization
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "itlxdtyrc4ggxyuw.public.blob.vercel-storage.com",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/events",
				headers: [
					{
						key: "x-timezone",
						value: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
				],
			},
		];
	},
	webpack: (config, { webpack }) => {
        config.plugins.push(
            new webpack.IgnorePlugin({
                resourceRegExp: /\.(md|txt)$/,
            })
        );
        return config;
    },
};
if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}
export default nextConfig;
