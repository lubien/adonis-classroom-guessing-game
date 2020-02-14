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

  show({ params, response }) {
    const id = Number(params.id)
    const post = posts.find(post => post.id === id)

    if (!post) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }

    response.json(post)
  }
}

module.exports = PostController
