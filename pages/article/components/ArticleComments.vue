<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentValue"
        ></textarea>
      </div>
      <div class="card-footer">
        <img v-if="user" :src="user.image" class="comment-author-img" />
        <button @click.prevent="onPostComment" class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
        >{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options" v-if="user && user.username === comment.author.username">
          <!-- 没看到编辑的API -->
          <!-- <i class="ion-edit"></i> -->
          <i class="ion-trash-a" @click="onDeleteComment(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComments } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      commentValue: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.getCommentsList()
  },
  methods: {
    async getCommentsList() {
      const { slug } = this.article
      const { data: { comments } } = await getComments(slug)
      this.comments = comments
    },
    async onPostComment () {
      if (!this.commentValue) return
      const { slug } = this.article
      const { data: { comment } } = await addComments(slug, this.commentValue)
      this.comments.unshift(comment)
      this.commentValue = ''
    },
    async onDeleteComment (id) {
      const { slug } = this.article
      await deleteComments(slug, id)
      const comments = this.comments.filter(comment => comment.id !== id);
      this.comments = comments
    }
  }
};
</script>

<style>
</style>