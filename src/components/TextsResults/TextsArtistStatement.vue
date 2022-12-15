<template>
	<div id="artist-statement-wrapper" class="h-full w-full bg-brand-gray-2">
		<div class="h-10"></div>
		<section class="mx-auto flex w-1/2 flex-nowrap rounded-md border bg-white">
			<div class="mx-auto px-12 py-10">
				<p>{{ displayTexts }}</p>
				<p>
					Most of my time is spent developing as an artist: researching and
					practicing. I like to work instinctively, not strategically. I find I
					need to work in many apparently contradictory directions: different
					scales, the simple and the complex, the observational and the
					‘imaginary’ - each seems to nourish the other, allowing new and
					unforeseen directions to develop. My work in its various forms is the
					result of constant experimentation and questioning. The themes are
					similarly diverse and conflicted: hedonism and stoicism; beauty and
					violence; virtue and sin; light and dark; religion and the void; the
					child and the adult. It is in this liminal space between, in the
					confliction itself, that the energy for these works is generated. It
					is important for me that the mediums and materials I work with serve
					as ways to give form to new ideas. Drawing, painting and sculpture are
					for me better suited than the digital and the photograph. I believe
					art should be a way to enhance life. The ‘Old Masters’ have been
					important to my development. The National Gallery has been a kind of
					church to me over the last 8 years or so: the visionary and prophetic
					wisdom imparted by these paintings. I use art to seek enlightenment,
					or at least spiritual evolution; I have tried to rid myself of these
					grandiose ideas, to make work out of play and pure enjoyment only, but
					they keep resurfacing. Admittedly I have romantic aspirations, and a
					tendency for grandiosity in my work: for profound, prophetic or
					classical themes as found in artists like Blake, Titian, Poussin,
					Puvis de Chavannes. I try to balance this tendency for lofty
					seriousness by also employing other, more playful, child-like or even
					grotesque mindsets; or by using other means – such as landscape
					painting – that are more about returning me to the present and to
					contemplating the beauty of nature, outside of the self. My paintings
					are a lot to do with the excitement of the painting processes:
					blocking in, scumbling, glazing, reworking; linear gridding and
					geometry; creating space and pattern and light, making colors and
					tones sing. I think that universality can be found in the personal; so
					my work is often, underlyingly, candidly autobiographical. The
					experience of sitting under Waterloo bridge listening to conversations
					and music and the thrum of the city, watching the lights flicker on
					the Thames, waiting for the last, or first, train home. These
					meaning-filled experiences found in everyday life are of central
					interest to my work as an artist. However, I am more and more steering
					in the direction of a kind of visionary, abstracted figuration. It’s
					hard to convey in words what these works are about: they are open in
					the sense that they are not predetermined, the subject emerging
					gradually. I hope to go on a journey. To be truthful I don’t fully
					understand these paintings myself, but that’s what I find exciting.
					Observational Art Statement I love painting ‘en plein air’. I am
					outside a lot, always with drawing or painting equipment; observing
					people, places, light and space in London or the countryside. It’s an
					intense experience, and after a day of painting I am usually
					exhausted, physically, mentally and emotionally, but nevertheless,
					reinvigorated. It is an ambitious and endlessly fascinating pursuit,
					which seems to get more so the more one learns. Whilst my
					observational paintings may have some similarities to Impressionist
					and Post-Impressionist painting, and indeed have been informed by
					those artists, when I am painting my thoughts return to the spirit of
					artists like Bellini, Piero Della Francesca, and Titian. I find that
					the works that are most successful are the result of having reminded
					myself that what I am witnessing is not just a “park” or a “street”
					but a cosmic event: an infinitely complex, infinitely beautiful,
					unnameable, ungraspable, miracle.
				</p>
			</div>
		</section>
		<div class="h-10"></div>
	</div>
</template>

<script>
import { mapState } from "pinia";

import { useTextsStore, INCLUDE_ARTIST_STATEMENT } from "@/stores/texts";

export default {
	name: "TextsArtistStatement",
	computed: {
		...mapState(useTextsStore, [INCLUDE_ARTIST_STATEMENT]),
		displayTexts() {
			return this.INCLUDE_ARTIST_STATEMENT;
		},
	},
	async mounted() {
		this.INCLUDE_ARTIST_STATEMENT;
	},
	// methods: {
	// 	...mapActions(useTextsStore, [INCLUDE_ARTIST_STATEMENT]),
	// },
};
</script>
