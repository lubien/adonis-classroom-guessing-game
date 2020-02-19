'use strict'

const { validate } = use('Validator')
const Post = use('App/Models/Post')

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
  async index({ response }) {
    response.json(await Post.all())
  }

  async show({ params, response }) {
    const id = Number(params.id)
    const post = await Post.find(id)

    if (!post) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }

    response.json(post)
  }

  async store({ request, response }) {
    // receber os dados do novo post
    // criar um objeto
    const newPostData = request.only(['title', 'description'])

    // valida o novo post
    const rules = {
      title: 'required|string',
      description: 'string'
    }

    const validation = await validate(newPostData, rules)

    if (validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    const post = new Post()
    post.title = newPostData.title
    post.description = newPostData.description

    await post.save()

    // retornar o novo post
    response.json(post)
  }

  async update({ params, request, response }) {
    // pegar o id do url
    const id = Number(params.id)
    // pegar a postagem de id tal
    const post = await Post.find(id)

    if (!post) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }

    // pegar os dados novos
    const updates = request.only(['title', 'description'])
    // atualizar a postagem
    const newPost = {
      ...post,
      ...updates
    }

    // valida o post atualizado
    const rules = {
      title: 'string',
      description: 'string'
    }

    const validation = await validate(newPost, rules)

    if (validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    post.merge(updates)
    await post.save()

    // retornar a postagem ja atualizada
    response.json(post)
  }

  destroy({ params, response }) {
    // pegar o id do url
    const id = Number(params.id)
    // encontrar a postagem
    const post = posts.find(post => post.id === id)

    if (!post) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }
    // deletar a postagem desse id
    const position = posts.findIndex(post => post.id === id)
    posts.splice(position, 1)
    // retornar nada com codigo No Content
    response.noContent({})
  }
}

module.exports = PostController
