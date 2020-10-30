<template>
  <section class="is-fullheight-with-navbar">
    <b-carousel :pause-info="false">
      <!-- 检索用户页面 -->
      <b-carousel-item key="carousel1">
        <section>
          <b-table :data="tableDataUser" :striped="true">
            <b-table-column
              label="序号"
              width="140"
              centered
              numeric
              v-slot="props"
            >
              {{ props.row.id }}
            </b-table-column>

            <b-table-column
              label="用户名"
              width="160"
              centered
              numeric
              v-slot="props"
            >
              {{ props.row.userID }}
            </b-table-column>

            <b-table-column label="密码" width="160" centered numeric v-slot="props">
              {{ props.row.password }}
            </b-table-column>

            <b-table-column label="编辑" width="180" centered v-slot="props">
              <b-button
                size="is-small"
                type="is-warning"
                icon-right="refresh"
                @click="selectUser(props.row.userID)"
              >
              </b-button>
            </b-table-column>

            <b-table-column label="删除用户" width="160" centered v-slot="props">
              <b-button
                size="is-small"
                type="is-danger"
                icon-right="delete"
                @click="deleteUser(props.row.userID)"
              ></b-button>
            </b-table-column>
          </b-table>
        </section>
      </b-carousel-item>
      <!-- 检索论文页面 -->
      <b-carousel-item key="carousel2">
        <section>
          <b-table :data="tableDataPaper" :striped="true">
            <b-table-column
              label="序号"
              width="140"
              centered
              numeric
              v-slot="props"
            >
              {{ props.row.id }}
            </b-table-column>

            <b-table-column
              label="用户名"
              width="160"
              centered
              numeric
              v-slot="props"
            >
              {{ props.row.userID }}
            </b-table-column>

            <b-table-column label="分类名" width="160" centered numeric v-slot="props">
              {{ props.row.categoryName }}
            </b-table-column>

            <b-table-column label="论文标题" width="180" centered v-slot="props">
              {{ props.row.title }}
            </b-table-column>
            <b-table-column label="论文链接" width="180" centered v-slot="props">
              <a :href="props.row.url" target="_blank">{{ props.row.url }}</a>
            </b-table-column>
            
            <b-table-column label="删除" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-danger" icon-right="delete"
                        @click="deletePaper(props.row.paperID)"></b-button>
            </b-table-column>
          </b-table>
        </section>
      </b-carousel-item>
      <!-- 检索评论页面 -->
      <b-carousel-item key="carousel3">
        <section>
          <b-table :data="tableDataComment" :striped="true">
            <b-table-column
              label="序号"
              width="140"
              centered
              numeric
              v-slot="props"
            >
              {{ props.row.id }}
            </b-table-column>

            <b-table-column
              label="分类名"
              width="160"
              centered
              numeric
              v-slot="props"
            >
              {{ props.row.categoryName }}
            </b-table-column>

            <b-table-column label="评论" centered numeric v-slot="props">
              {{ props.row.content }}
            </b-table-column>

            <b-table-column label="用户" width="180" centered v-slot="props">
              {{ props.row.userID }}
            </b-table-column>
            <b-table-column label="时间" width="180" centered v-slot="props">
              {{ props.row.date }}
            </b-table-column>
            <b-table-column label="删除" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-danger" icon-right="delete"
                        @click="deleteComment(props.row.commentID)"></b-button>
            </b-table-column>
          </b-table>
        </section>
      </b-carousel-item>
    </b-carousel>
    <!-- 修改用户信息模态框-->
    <b-modal
      :active.sync="isUpdateModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <form action=" ">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">修改个人信息</p>
          </header>
          <section class="modal-card-body">
            <b-field label="新密码">
              <b-input v-model="passwordInModal" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button
              class="button"
              type="button"
              @click="isModalActive = false"
              >关闭</b-button
            >
            <b-button class="button is-primary" @click="updateUser"
              >修改</b-button
            >
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>

export default {
  name: "Navbar",
  components: {
  },
  data() {
    return {
      tableDataUser: [],
      tableDataPaper: [],
      tableDataComment: [],
      userInfoList: [],
      paperInfoList: [],
      commentInfoList: [],
      isUpdateModalActive: false,
      passwordInModal: "",
      userSelected: null,
    };
  },
  mounted() {
    this.retrieveUser()
    this.retrieveAllPaper()
    this.retrieveAllComment()
  },
  methods: {
    retrieveUser() {
      const path = '/api/retrieveUser'
      this.$axios.get(path).then(response => {
        this.userInfoList = response.data.msg
        this.tableDataUser = []
        // userInfoList[i] = {userID, password}
        for (let i = 0; i < this.userInfoList.length; i++) {
          // 视图中的数据
          const row = {'id': i + 1,
                'userID': this.userInfoList[i]['userID'],
                'password': this.userInfoList[i]['password'],}
          this.tableDataUser.push(row)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    retrieveAllPaper() {
      const path = '/api/retrieveAllPaper'
      this.$axios.get(path).then(response => {
        this.paperInfoList = response.data.msg
        this.tableDataPaper = []
        // paperInfoList[i] = {userID, categoryName, title, url, paperID}
        for (let i = 0; i < this.paperInfoList.length; i++) {
          // 视图中的数据
          const row = {'id': i + 1,
                'userID': this.paperInfoList[i]['userID'],
                'categoryName': this.paperInfoList[i]['categoryName'],
                'title': this.paperInfoList[i]['title'],
                'url': this.paperInfoList[i]['url'],
                'paperID': this.paperInfoList[i]['paperID'],}
          this.tableDataPaper.push(row)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    retrieveAllComment() {
      const path = '/api/retrieveAllComment'
      this.$axios.get(path).then(response => {
        this.commentInfoList = response.data.msg
        this.tableDataComment = []
        // commentInfoList[i] = {categoryName, content, userID, date, commentID}
        for (let i = 0; i < this.commentInfoList.length; i++) {
          // 视图中的数据
          const row = {'id': i + 1,
                'categoryName': this.commentInfoList[i]['categoryName'],
                'content': this.commentInfoList[i]['content'],
                'userID': this.commentInfoList[i]['userID'],
                'date': this.commentInfoList[i]['date'],
                'commentID': this.commentInfoList[i]['commentID'],}
          this.tableDataComment.push(row)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selectUser(id) {
      this.userSelected = id
      this.isUpdateModalActive = true
    },
    deleteUser(id) {
      const path = `/api/deleteUser`
      const params = this.$qs.stringify({userID: id})
      this.$axios.post(path, params)
      .then(response => {
        this.retrieveUser()
      }).catch(err => {
        console.log(err)
      })
    },
    updateUser() {
      const path = `/api/updateUser`
      const params = this.$qs.stringify({
                          userID: this.userSelected,
                          password: this.passwordInModal})
      this.$axios.post(path, params)
      .then(response => {
        // 更新视图数据
        this.retrieveCategory()
        this.passwordInModal = "";
        this.isUpdateModalActive = false;
      }).catch(err => {
        console.log(err)
      })
    },
    deletePaper(id) {
      const path = `/api/deletePaper`
      const params = this.$qs.stringify({paperID: id})
      this.$axios.post(path, params)
      .then(response => {
        this.retrieveAllPaper()
      }).catch(err => {
        console.log(err)
      })
    },
    deleteComment(id) {
      const path = `/api/deleteComment`
      const params = this.$qs.stringify({commentID: id})
      this.$axios.post(path, params)
      .then(response => {
        this.retrieveAllComment()
      }).catch(err => {
        console.log(err)
      })
    }
  },
};
</script>

<style scoped>
</style>
