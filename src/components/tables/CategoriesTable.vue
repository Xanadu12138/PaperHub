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
            <b-button class="button is-primary" @click="updateCategory">修改</b-button>
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
      categories: [
            { 'categoryID': 1, 'categoryName': 'c1', 'userID': 1, 'isPublic': false},
            { 'categoryID': 2, 'categoryName': 'c2', 'userID': 1, 'isPublic': false},
            { 'categoryID': 3, 'categoryName': 'c3', 'userID': 1, 'isPublic': true},
            { 'categoryID': 4, 'categoryName': 'c4', 'userID': 1, 'isPublic': false},
            { 'categoryID': 5, 'categoryName': 'c5', 'userID': 1, 'isPublic': false}
      ],
      isCreateModalActive: false,
      isUpdateModalActive: false,
      categoryNameInModal: '',
      categorySelected: 0
    }
  },
  mounted () {
    for (let i = 0; i < this.categories.length; i++) {
      const row = {'id': i + 1,
             'categoryName': this.categories[i]['categoryName'],
             'isPublic': this.categories[i]['isPublic'],
             'categoryID': this.categories[i]['categoryID']}
      // console.log(row)
      this.tableData.push(row)
    }
  },
  methods: {
    enterCategory(id) {
      this.$router.push('/papers')
    },
    createCategory(name) {
      // axios
      const row = { 'id': this.tableData.length + 1, 
                    'categoryName': this.categoryNameInModal, 'isPublic': false,
                    'categoryID': 6}
      this.tableData.push(row)
      this.categoryNameInModal = ''
      this.isCreateModalActive = false
    },
    deleteCategory(id) {
      // 过滤/删除对应元素
      this.tableData = this.tableData.filter(row => row['categoryID'] != id)
      // 更新序号
      for (let i = 0; i < this.tableData.length; i++) {
        // 数组地址不变，强制刷新view内容: vue.$set
        // this.$set(this.tableData[i], 'id', i + 1)
        this.tableData[i]['id'] = i + 1
      }
    },
    selectCategory(id) {
      this.categorySelected = id
      this.isUpdateModalActive = true
    },
    updateCategory() {
      // this.tableData.
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]['categoryID'] == this.categorySelected)
          this.tableData[i]['categoryName'] = this.categoryNameInModal
      }
      this.categoryNameInModal = ''
      this.isUpdateModalActive = false
    },
    changeStatus(id) {
      // axios
    }
  }
}
    // const db = firebase.firestore()
    // const section = this.$store.state.userInfo.section
    // // admin privilege
    // if (section === 0) {
    //   db.collection('students')
    //     .get()
    //     .then(query => {
    //       query.forEach(doc => {
    //         this.students.push({
    //           name: doc.id,
    //           info: doc.data()
    //         })
    //       })
    //     })
    //     .catch(err => console.log('Error getting documents:', err))
    // } else {
    //   db.collection('students')
    //     .where('section', '==', section)
    //     .get()
    //     .then(query => {
    //       query.forEach(doc => {
    //         this.students.push({
    //           name: doc.id,
    //           info: doc.data()
    //         })
    //       })
    //     })
    //     .catch(err => console.log('Error getting documents:', err))
    // }  
</script>

<style scoped>

</style>

