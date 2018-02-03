const Finder = {
  where(conditions) {
    const collection = this.collection()

    return Object
      .keys(conditions)
      .reduce(
        (results, key) => results.filter(item => item[key] == conditions[key]), collection
      )
  },

  findAll() {
    return this.collection()
  },

  find(id) {
    return this.collection().find(record => record.id === +id)
  },

  findIndex(id) {
    return this.collection().findIndex(recode => recode.id === +id)
  }

}

export default Finder