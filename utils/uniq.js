export default (set) => {
  return new Set(
    Array
      .from(
        new Set(
          Array
            .from(set)
            .map(i => JSON.stringify(i))
        )
      )
      .map(i => JSON.parse(i))
  )
}
