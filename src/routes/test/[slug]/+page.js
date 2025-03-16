/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		post: {
			title: `Title for ${params.slug} goes here`,
			content: `Content for ${params.slug} goes here`
		},
        color: {
            red: `This is red.`,
            blue: `This is blue`
        }
	};
}