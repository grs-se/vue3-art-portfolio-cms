export interface Artwork {
	categories: string[];
	date: string;
	description: string;
	destroyed?: boolean;
	dimensions: {
		height: {
			cm?: number;
			px: number;
		};
		width: {
			cm?: number;
			px: number;
		};
		depth: {
			cm?: number;
			px?: number;
		};
	};
	exhibitions?: string[];
	hero?: boolean;
	id?: string;
	imageCover: string;
	imageDetails?: string[];
	location: string[];
	medium: string[];
	ratingPersonal?: number;
	ratingsAverage?: number;
	ratingsQuantity?: number;
	sales: {
		price: number;
		priceRange?: string;
	};
	slug?: string;
	spotlight?: boolean;
	tags?: string[];
	title: string;
	_id?: string;
}
