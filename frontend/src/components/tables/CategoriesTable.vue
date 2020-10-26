<template>
    <!-- 个人分类界面 -->
    <section class="is-fullheight-with-navbar">
      <b-table
            :data="tableData"
            :striped="true">
        
            <b-table-column field="id" label="序号" width="100" centered numeric v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="categoryName" label="分类" centered v-slot="props">
                {{ props.row.categoryName }}
            </b-table-column>

            <b-table-column label="进入分类" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-info" icon-right="apps"
                        @click="enterCategory(props.row.categoryID)"></b-button>
            </b-table-column>

            <b-table-column label="是否公开" width="140" centered v-slot="props">
              <section>
                    <b-switch v-model="props.row.isPublic" type="is-info"
                              @input="changeStatus(props.row.categoryID)"></b-switch>
              </section>
            </b-table-column>

            <b-table-column label="编辑名称" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-warning" icon-right="refresh"
                        @click="selectCategory(props.row.categoryID)"></b-button>
            </b-table-column>

            <b-table-column label="删除" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-danger" icon-right="delete"
                        @click="deleteCategory(props.row.categoryID)"></b-button>
            </b-table-column>
      </b-table>
      <div class="hero">
        <button class="button field is-primary" @click="isCreateModalActive = true">
          新建分类
        </button>
      </div>
      <!-- 新建分类模态框-->
      <b-modal :active.sync="isCreateModalActive"
             has-modal-card
             trap-focus
             aria-role="dialog"
             aria-modal>
              <form action=" ">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">新建分类</p>
          </header>
          <section class="modal-card-body">
            <b-field label="分类名字">
              <b-input v-model="categoryNameInModal" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button class="button" type="button" @click="isCreateModalActive=false">关闭</b-button>
            <b-button class="button is-primary" @click="createCategory">新建</b-button>
          </footer>
         </div>
        </form>
      </b-modal>
      <!-- 修改分类模态框-->
      <b-modal :active.sync="isUpdateModalActive"
             has-modal-card
             trap-focus
             aria-role="dialog"
             aria-modal>
              <form action=" ">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">修改分类</p>
          </header>
          <section class="modal-card-body">
            <b-field label="分类名字">
              <b-input v-model="categoryNameInModal" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button class="button" type="button" @click="isModalActive=false">关闭</b-button>
            <b-button class="button is-primary" @click="changeName">修改</b-button>
          </footer>
         </div>
        </form>
      </b-modal>
    </section>
</template>

<script>
export default {
  name: 'CategoriesTable',
  components: {
  },
  data () {
    return {
      tableData: [],
      categories: [],
      isCreateModalActive: false,
      isUpdateModalActive: false,
      categoryNameInModal: '',
      categorySelected: 0
    }
  },
  mounted () {
    this.retrieveCategory()
  },
  methods: {
    retrieveCategory() {
      const path = 'http://localhost:8000/api/retrieveCategory?userID=' +
                    this.$store.state.userInfo.userID
      this.$axios.get(path).then(response => {
        this.categories = response.data.msg
        this.tableData = []
        // categories[i] = {categoryID, categoryName, isPublic, userID}
        for (let i = 0; i < this.categories.length; i++) {
          // 视图中的数据
          const row = {'id': i + 1,
                'categoryName': this.categories[i]['categoryName'],
                'isPublic': this.categories[i]['isPublic'],
                'categoryID': this.categories[i]['categoryID']}
          this.tableData.push(row)
          // console.log(row)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    createCategory(name) {
      const path = `http://localhost:8000/api/createCategory`
      const params = this.$qs.stringify({
                          categoryName: this.categoryNameInModal, 
                          isPublic: "False"})
      this.$axios.post(path, params)
      .then(response => {
        // 更新视图数据
        this.categoryNameInModal = ''
        this.isCreateModalActive = false
        this.retrieveCategory()
      }).catch(err => {
        console.log(err)
      })
    },
    deleteCategory(id) {
      const path = `http://localhost:8000/api/deleteCategory`
      const params = this.$qs.stringify({categoryID: id})
      this.$axios.post(path, params)
      .then(response => {
        // 更新视图数据
        this.retrieveCategory()
      }).catch(err => {
        console.log(err)
      })
    },
    updateCategory(id, name, status) {
      const path = `http://localhost:8000/api/updateCategory`
      const params = this.$qs.stringify({
                          categoryID: id,
                          categoryName: name,
                          isPublic: status})
      this.$axios.post(path, params)
      .then(response => {
        // 更新视图数据
        this.retrieveCategory()
      }).catch(err => {
        console.log(err)
      })
    },
    selectCategory(id) {
      this.categorySelected = id
      this.isUpdateModalActive = true
    },
    changeName() {
      let status = "False"
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]['categoryID'] == this.categorySelected)
          status = this.tableData[i]['isPublic'] ? "True" : "False"
      }
      this.updateCategory(this.categorySelected, this.categoryNameInModal, status)
      this.categoryNameInModal = ''
      this.isUpdateModalActive = false
    },
    changeStatus(id) {
      let status = "False"
      let name = ''
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]['categoryID'] == id) {
          status = this.tableData[i]['isPublic'] ? "True" : "False"
          name = this.tableData[i]['categoryName']
        }
      }
      this.updateCategory(id, name, status)
    },
    enterCategory(id) {
      // query携带路由
      this.$router.push({path: '/papers',
                         query: {id:id}})
    },
  }
}
    
</script>

<style scoped>

</style>

