import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import type { Artwork } from "@/api/types";
import ArtworkListing from "@/components/ArtworkResults/ArtworkCard2.vue";

import { createArtwork } from "../../../utils/createArtwork";

describe("ArtworkListing", () => {
	const renderArtworkListing = (artwork: Artwork) => {
		render(ArtworkListing, {
			global: {
				stubs: {
					"router-link": RouterLinkStub,
				},
			},
			props: {
				artwork: {
					...artwork,
				},
			},
		});
	};

	it("renders artwork title", () => {
		const artworkProps = createArtwork({ title: "Mona Lisa" });
		renderArtworkListing(artworkProps);
		expect(screen.getByText("Mona Lisa")).toBeInTheDocument();
	});

	// it("renders artwork medium", () => {
	// 	const artworkProps = createArtwork({ medium: ["Oil on canvas"] });
	// 	renderArtworkListing(artworkProps);
	// 	expect(screen.getByText("Oil on canvas")).toBeInTheDocument();
	// });

	// it("renders artwork locations", () => {
	// 	const artworkProps = createArtwork({
	// 		location: ["London", "UK"],
	// 	});
	// 	renderArtworkListing(artworkProps);
	// 	expect(screen.getByText("London")).toBeInTheDocument();
	// 	expect(screen.getByText("UK")).toBeInTheDocument();
	// });

	// it("renders artwork dimensions", () => {
	// 	const artworkProps = createArtwork({
	// 		dimensions: { height: { px: 20 } },
	// 		width: { px: 30 },
	// 	});
	// 	renderArtworkListing(artworkProps);
	// 	expect(screen.
	// 	expect(screen.getByText("30")).toBeInTheDocument();
	// });
});
