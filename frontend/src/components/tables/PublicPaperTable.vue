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
                    <a :href="props.row.url" target="_blank">{{ props.row.url }}</a>
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
        </b-table>
    </section>
</template>

<script>
export default {
  name: 'PublicPapersTable',
  components: {
  },
  data () {
    return {
      curCategoryID: null,
      tableData: [],
      papers: [],
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
    }
  }
}
</script>

<style scoped>
</style>

