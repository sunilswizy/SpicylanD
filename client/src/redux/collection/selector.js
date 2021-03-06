import { createSelector } from "reselect";

const select = state => state.collection;

export const selectCollection = createSelector(
	[select],
	select => select.collection
);

export const selectLoading = createSelector(
	[select],
	select => select.isLoading
);
