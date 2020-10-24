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
          <button class="button field is-primary" @click="isCreateModalActive = true">
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
      tableData: [],
      papers: [
            { 'paperID': 1, 'url': 'https://arxiv.org/pdf/2010.11731.pdf', 'title': 'aws', 'author': 'cl', 'description': '231sada'},
            { 'paperID': 2, 'url': 'https://www.baidu.com', 'title': 'aws', 'author': 'cl', 'description': '231sada'},
            { 'paperID': 3, 'url': 'https://www.baidu.com', 'title': 'aas', 'author': 'cl', 'description': '231sada'},
            { 'paperID': 4, 'url': 'https://www.baidu.com', 'title': 'aw1231s', 'author': 'cl', 'description': '231sada'},
            { 'paperID': 5, 'url': 'https://www.baidu.com', 'title': 'awasds', 'author': 'cl', 'description': '231sada'},
            { 'paperID': 6, 'url': 'https://www.baidu.com', 'title': 'awss', 'author': 'cl', 'description': '231sada'}
      ],
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
    for (let i = 0; i < this.papers.length; i++) {
      const row = {'id': i + 1,
             'url': this.papers[i]['url'],
             'title': this.papers[i]['title'],
             'author': this.papers[i]['author'],
             'description': this.papers[i]['description'],
             'paperID': this.papers[i]['paperID']}
      // console.log(row)
      this.tableData.push(row)
    }
  },
  methods: {
    createPaper(name) {
      // axios
      const row = { 'id': this.tableData.length + 1, 
                    'url': this.urlInModal,
                    'title': this.titleInModal,
                    'author': this.authorInModal,
                    'description': this.descriptionInModal,
                    'paperID': 100}
      this.tableData.push(row)
      this.urlInModal = '',
      this.titleInModal = '',
      this.authorInModal = '',
      this.descriptionInModal = '',
      this.isCreateModalActive = false
    },
    deletePaper(id) {
      // 过滤/删除对应元素
      this.tableData = this.tableData.filter(row => row['paperID'] != id)
      // 更新序号
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i]['id'] = i + 1
      }
    },
    selectPaper(id) {
      this.paperSelected = id
      this.isUpdateModalActive = true
    },
    updatePaper() {
      // this.tableData.
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]['paperID'] == this.paperSelected) {
          this.tableData[i]['url'] = this.urlInModal
          this.tableData[i]['title'] = this.titleInModal
          this.tableData[i]['author'] = this.authorInModal
          this.tableData[i]['description'] = this.descriptionInModal
        }
      }
      this.urlInModal = '',
      this.titleInModal = '',
      this.authorInModal = '',
      this.descriptionInModal = '',
      this.isUpdateModalActive = false
    },
    changeStatus(id) {
      // axios
    }
  }
}
</script>

<style scoped>
</style>

