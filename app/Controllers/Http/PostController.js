'use strict'

const posts = [
  {
    id: 1,
    title: 'Meu post novo',
    content: 'Lorem ipsum dolor sit amet'
  },
  {
    id: 2,
    title: 'Um outro post',
    content: 'Lorem ipsum dolor sit amet'
  }
]

class PostController {
  index({ response }) {
    response.json(posts)
  }
}

module.exports = PostController
