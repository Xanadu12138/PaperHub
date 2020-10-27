<template>
    <section>
        <!-- 公共论文列表 -->
        <b-table
            :data="tableData"
            :striped="true">

            <b-table-column field="id" label="序号" width="100" centered numeric v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="categoryName" label="分类名" centered v-slot="props">
                {{ props.row.categoryName }}
            </b-table-column>

            <b-table-column field="userName" label="创建人" centered v-slot="props">
                {{ props.row.userID }}
            </b-table-column>

             <b-table-column label="进入分类" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-info" icon-right="apps"
                        @click="enterCategory(props.row.categoryID)"></b-button>
            </b-table-column>

            <b-table-column label="查看评论" width="100" centered v-slot="props">
              <b-button size="is-small" type="is-warning"
                        @click="goAndQueryComments(props.row.categoryID)">...</b-button>
            </b-table-column>
        </b-table>
    </section>
</template>

<script>
export default {
  name: 'PublicTable',
  components: {
  },
  data () {
    return {
      tableData: [],
      categories: [],
    }
  },
  methods: {
    enterCategory(id) {
      // query携带路由
      this.$router.push({path: '/publicpapers',
                         query: {id:id}})
    },
    goAndQueryComments(id){
      // query携带路由
      this.$router.push({path: '/comments',
                         query: {id:id}})
    }
  },
  mounted () {
      const path = '/api/retrievePublicCategories'
      this.$axios.get(path).then(response => {
        this.categories = response.data.msg
        this.tableData = []
        // categories[i] = {categoryID, categoryName, isPublic, userID}
        for (let i = 0; i < this.categories.length; i++) {
          // 视图中的数据
          const row = {'id': i + 1,
                'categoryName': this.categories[i]['categoryName'],
                'categoryID': this.categories[i]['categoryID'],
                'userID': this.categories[i]['userID'],}
          this.tableData.push(row)
        }
      }).catch(err => {
        console.log(err)
      })
  }
} 
</script>

<style scoped>

</style>

