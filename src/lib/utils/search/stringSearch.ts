export function stringSearch(items: string[], query: string) {
    const tokens = query.toLowerCase().trim().split(/\s+/);

  const mappedItems = items.map(item => {
      const text = item.toLowerCase();
      const words = text.split(/\s+/);

      let score = 0;

      for (const token of tokens) {
        if (text.includes(token)) score += 10;

        if (words.includes(token)) score += 5;

        if (text.startsWith(token)) score += 3;
      }

      return { item, score };
    });

    return mappedItems
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
}