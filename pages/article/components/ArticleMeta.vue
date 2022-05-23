<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
        class="author"
      >{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
      @click="onFollowAuthor(article.author)"
      :disabled="article.author.loading"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ article.author.following ? 'UnFollow' : 'Follow' }} {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
      @click="onFollowPost(article)"
      :disabled="article.favoritedLoading"
    >
      <i class="ion-heart"></i>
      &nbsp; {{ article.favorited ? 'UnFavorite' : 'Favorite' }} Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { addFollow, cancelFollow } from '@/api/profile'
import { addFavorite, deleteFavorite } from '@/api/article'
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 关注作者
    async onFollowAuthor(author) {
      author.loading = true
      if (author.following) {
        // 取消关注
        await cancelFollow(author.username)
        author.following = false
      } else {
        // 关注
        await addFollow(author.username)
        author.following = true
      }
      author.loading = false
    },
    // 关注文章
    async onFollowPost (article) {
      article.favoritedLoading = true
      if (article.favorited) {
        // 取消关注
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 关注
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoritedLoading = false
    }
  }
};
</script>

<style>
</style>