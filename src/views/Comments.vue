<template>
  <section>
    <!-- 评论区 -->
    <!-- <b-message type="is-info" has-icon icon="account" v-slot="props">
      {{ props.row.content }}
    </b-message>
    <b-message type="is-info" has-icon icon="account">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
      fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien
      laoreet elit
    </b-message>
    <b-message type="is-info" has-icon icon="account">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
      fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien
      laoreet elit
    </b-message> -->
    <b-table :data="tableData">
      <b-table-column
        field="original_title"
        label="序号"
        sortable
        v-slot="props"
        width="500"
      >
        {{ props.row.commentID }}
      </b-table-column>

      <b-table-column label="评论" width="1500" v-slot="props">
        {{ props.row.content }}
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
            <b-field label="内容" :label-position="labelPosition">
              <b-input
                maxlength="1000"
                type="textarea"
                v-model="userCommentinModal"
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
      tableData: [],
      comments: [
        { commentID: "1", content: "123" },
        { commentID: "2", content: "312" },
        { commentID: "3", content: "123" },
        { commentID: "4", content: "312" },
        { commentID: "5", content: "123" },
      ],
      //   isCommentModalActive: false,
      isCreateModalActive: false,
      userCommentinModal: "",
    };
  },
  mounted() {
    for (let i = 0; i < this.comments.length; i++) {
      const row = {
        // id: i + 1,
        commentID: this.comments[i]["commentID"],
        content: this.comments[i]["content"],
      };
      console.log(1, row);
      this.tableData.push(row);
    }
  },
  methods: {
    createComment() {
      const row = {
        commentID: this.tableData.length + 1,
        content: this.userCommentinModal,
      };
      this.tableData.push(row);
      this.userCommentinModal = "";
      this.isCreateModalActive = false;
      console.log(2, row);
    },
  },
};
</script>

<style scoped>
</style>