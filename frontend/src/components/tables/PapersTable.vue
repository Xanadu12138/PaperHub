<template>
    <!-- 个人分类界面 -->
    <section class="is-fullheight-with-navbar">
        <b-table
            :data="tableData"
            :striped="true">

            <b-table-column field="id" label="序号" width="100" centered numeric v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="url" label="论文链接" centered numeric v-slot="props">
                <div>
                    <a :href="props.row.url">{{ props.row.url }}</a>
                </div>
            </b-table-column>

            <b-table-column field="title" label="标题" centered v-slot="props">
                {{ props.row.title }}
            </b-table-column>

            <b-table-column label="作者" width="100" centered v-slot="props">
                {{ props.row.author }}
            </b-table-column>

            <b-table-column label="描述" centered v-slot="props">
               {{ props.row.description }} 
            </b-table-column>

            <b-table-column label="编辑名称" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-warning" icon-right="refresh"
                        @click="selectPaper(props.row.paperID)"></b-button>
            </b-table-column>

            <b-table-column label="删除" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-danger" icon-right="delete"
                        @click="deletePaper(props.row.paperID)"></b-button>
            </b-table-column>
        </b-table>
        <div class="hero">
          <button class="button field is-primary"  @click="isCreateModalActive = true">
              新增论文
          </button>
        </div>
      <!-- 新建论文模态框-->
      <b-modal :active.sync="isCreateModalActive"
             has-modal-card
             trap-focus
             aria-role="dialog"
             aria-modal>
              <form action=" ">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">新建论文</p>
          </header>
          <section class="modal-card-body">
            <b-field label="论文链接">
              <b-input v-model="urlInModal" required></b-input>
            </b-field>
            <b-field label="标题">
              <b-input v-model="titleInModal" required></b-input>
            </b-field>
            <b-field label="作者">
              <b-input v-model="authorInModal" required></b-input>
            </b-field>
            <b-field label="描述">
              <b-input v-model="descriptionInModal" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button class="button" type="button" @click="isCreateModalActive=false">关闭</b-button>
            <b-button class="button is-primary" @click="createPaper">新建</b-button>
          </footer>
         </div>
        </form>
      </b-modal>
      <!-- 修改论文模态框-->
      <b-modal :active.sync="isUpdateModalActive"
             has-modal-card
             trap-focus
             aria-role="dialog"
             aria-modal>
              <form action=" ">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">修改论文</p>
          </header>
          <section class="modal-card-body">
            <b-field label="论文链接">
              <b-input v-model="urlInModal" required></b-input>
            </b-field>
            <b-field label="标题">
              <b-input v-model="titleInModal" required></b-input>
            </b-field>
            <b-field label="作者">
              <b-input v-model="authorInModal" required></b-input>
            </b-field>
            <b-field label="描述">
              <b-input v-model="descriptionInModal" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button class="button" type="button" @click="isUpdateModalActive=false">关闭</b-button>
            <b-button class="button is-primary" @click="updatePaper">修改</b-button>
          </footer>
         </div>
        </form>
      </b-modal>
    </section>
</template>

<script>
export default {
  name: 'PapersTable',
  components: {
  },
  data () {
    return {
      curCategoryID: null,
      tableData: [],
      papers: [],
      isCreateModalActive: false,
      isUpdateModalActive: false,
      urlInModal: '',
      titleInModal: '',
      authorInModal: '',
      descriptionInModal: '',
      paperSelected: 0
    }
  },
  mounted () {
    this.curCategoryID = this.$route.query.id
    this.retrievePaper()
  },
  methods: {
    retrievePaper() {
      const path = '/api/retrievePaper?categoryID=' +
                    this.curCategoryID
      this.$axios.get(path).then(response => {
        this.papers = response.data.msg
        this.tableData = []
        // papers[i] = {paperID, url, title, author, description}
        for (let i = 0; i < this.papers.length; i++) {
          const row = {'id': i + 1,
                'url': this.papers[i]['url'],
                'title': this.papers[i]['title'],
                'author': this.papers[i]['author'],
                'description': this.papers[i]['description'],
                'paperID': this.papers[i]['paperID']}
          this.tableData.push(row)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    createPaper(name) {
      const path = `/api/createPaper`
      const params = this.$qs.stringify({
                          categoryID: this.curCategoryID, 
                          url: this.urlInModal,
                          title: this.titleInModal,
                          author: this.authorInModal,
                          description: this.descriptionInModal,})
      this.$axios.post(path, params)
      .then(response => {
        // 更新视图数据
        this.urlInModal = '',
        this.titleInModal = '',
        this.authorInModal = '',
        this.descriptionInModal = '',
        this.isCreateModalActive = false
        this.retrievePaper()
      }).catch(err => {
        console.log(err)
      })
    },
    deletePaper(id) {
      const path = `/api/deletePaper`
      const params = this.$qs.stringify({paperID: id})
      this.$axios.post(path, params)
      .then(response => {
        this.retrievePaper()
      }).catch(err => {
        console.log(err)
      })
    },
    selectPaper(id) {
      this.paperSelected = id
      this.isUpdateModalActive = true
    },
    updatePaper() {
      const path = `/api/updatePaper`
      const params = this.$qs.stringify({
                          paperID: this.paperSelected, 
                          url: this.urlInModal,
                          title: this.titleInModal,
                          author: this.authorInModal,
                          description: this.descriptionInModal,})
      this.$axios.post(path, params)
      .then(response => {
        this.retrievePaper()
        this.urlInModal = '',
        this.titleInModal = '',
        this.authorInModal = '',
        this.descriptionInModal = '',
        this.isUpdateModalActive = false
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>

