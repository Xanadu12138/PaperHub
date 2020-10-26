<template>
  <section>
    <!-- 评论区 -->
    <b-table :data="tableData">
      <b-table-column
        field="original_title"
        label="序号"
        v-slot="props"
        width="100"
      >
        {{ props.row.id }}
      </b-table-column>

      <b-table-column label="评论" width="1000" v-slot="props">
        {{ props.row.content }}
      </b-table-column>
      <b-table-column label="作者" v-slot="props">
        {{ props.row.userID }}
      </b-table-column>
      <b-table-column label="时间" v-slot="props">
        {{ props.row.date }}
      </b-table-column>
    </b-table>

    <div class="hero">
      <button
        class="button field is-primary"
        @click="isCreateModalActive = true"
      >
        添加评论
      </button>
    </div>
    <!-- 新建评论模态框-->
    <b-modal
      :active.sync="isCreateModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <form action=" ">
        <div class="modal-card" style="width: 800px">
          <header class="modal-card-head">
            <p class="modal-card-title">新评论</p>
          </header>
          <section class="modal-card-body">
            <b-field label="内容">
              <b-input
                maxlength="1000"
                type="textarea"
                v-model="commentInModal"
                required
              ></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button
              class="button"
              type="button"
              @click="isCreateModalActive = false"
              >关闭</b-button
            >
            <b-button class="button is-primary" @click="createComment"
              >新建</b-button
            >
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: "PublicTable",
  components: {},
  data() {
    return {
      curCategoryID: null,
      tableData: [],
      comments: [],
      isCreateModalActive: false,
      commentInModal: "",
    };
  },
  mounted() {
    this.curCategoryID = this.$route.query.id
    this.retrieveComment()
  },
  methods: {
    retrieveComment() {
      const path = 'http://localhost:8000/api/retrieveComment?categoryID=' +
                    this.curCategoryID
      this.$axios.get(path).then(response => {
        this.categories = response.data.msg
        this.tableData = []
        // comments[i] = {commentID, content, userID, date}
        for (let i = 0; i < this.comments.length; i++) {
          const row = {
            id: i + 1,
            content: this.comments[i]["content"],
            userID: this.comments[i]["userID"],
            date: this.comments[i]["date"],
          };
          this.tableData.push(row);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    createComment() {
      const path = `http://localhost:8000/api/createCategory`
      const params = this.$qs.stringify({
                          content: this.commentInModal, 
                          categoryID: this.curCategoryID})
      this.$axios.post(path, params)
      .then(response => {
        // 更新视图数据
        this.commentInModal = "";
        this.isCreateModalActive = false;
        this.retrieveComment()
      }).catch(err => {
        console.log(err)
      })
    },
  },
};
</script>

<style scoped>
</style>