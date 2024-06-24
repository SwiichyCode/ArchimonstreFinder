/**
 * This function processes the given data by removing certain properties from specific items,
 * filtering the items, and merging the remaining properties of the filtered items.
 * @param {Array<Array<{ search: string | null, order: string | null }>>} data - The data to process.
 * @returns {Array<{ search?: string, order?: string }>} The processed data.
 */
export function processData(
  data: Array<Array<{ search: string | null; order: string | null }>>,
): Array<{ search?: string; order?: string }> {
  // Map over the outer array
  const result = data.map((subArray) =>
    // Map over the inner array
    subArray.map((item, index) => {
      // If the index is 1, remove the 'order' property
      if (index === 1) {
        const { order, ...rest } = item;
        return rest;
      }
      // If the index is 5, remove the 'search' property
      if (index === 5) {
        const { search, ...rest } = item;
        return rest;
      }
      // Otherwise, return the item as is
      return item;
    }),
  );

  // Filter the items in the inner arrays
  const filteredResult = result.map((subArray) => subArray.filter((_, index) => index === 1 || index === 5));

  // Merge the properties of the filtered items
  return filteredResult.map((subArray) => Object.assign({}, ...subArray));
}
