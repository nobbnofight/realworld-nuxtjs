<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="description"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/ArticleMeta.vue'
import ArticleComments from './components/ArticleComments.vue'
export default {
  name: "ArticleIndex",
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.article.description}`
        }
      ],
    }
  },
  components: {
    ArticleMeta,
    ArticleComments
  },
  async asyncData ({ params }) {
    const { slug } = params
    const { data: { article } } = await getArticleDetail(slug)
    const md = new MarkdownIt()
    const description = md.render(article.body)
    article.author.loading = false
    article.favoritedLoading = false
    return { article, description }
  }
};
</script>

<style>
</style>