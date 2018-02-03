import Serializer from '../serializer'

const SessionSerializer = {
  ...Serializer,

  create(user) {
    const { id, email, isAdmin } = user

    return { id, email, isAdmin }
  }
}

export default SessionSerializer