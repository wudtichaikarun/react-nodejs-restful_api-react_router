import db from '../db'
import Finder from './finder'
import Pagination from './pagination'

const Model = {
  ...Finder,
  ...Pagination,
  
  findAll() {
    return this.collection()
  },

  find(id) {
    return this.findRecord(id)
  },

  create(attrs) {
    const collection = this.collection()
    const recored = this.withPermitedAttrs(attrs, { id: collection.length + 1 })

    this.setCollection([...collection, recored])
    return recored
  },

  update(id, attrs) {
    const collection = this.collection()
    const index = this.findIndex(id)

    const updateRecord = this.withPermitedAttrs(attrs, collection[index])
    this.setCollection([
      ...collection.slice(0, index),
      updateRecord,
      ...collection.slice(index + 1)
    ])

    return updateRecord
  },

  delete(id) {
    const collection = this.collection()
    const index = this.findIndex(id)

    this.setCollection([
      ...collection.slice(0, index),
      ...collection.slice(index + 1)
    ])
  },

  collection() {
    return db[this.key]
  },

  findRecord(id) {
    return this.collection().find(record => record.id === +id)
  },

  findIndex(id) {
    return this.collection().findIndex(record => record.id === +id)
  },

  withPermitedAttrs(attrs, init={}) {
    return this.permittedAttrs.reduce(
      (record, attr) =>
        attrs[attr] ? { ...record, [attr]: attrs[attr] } : record, init
    )
  },

  setCollection(collection) {
    db[this.key] = collection
  }
}

export default Model
