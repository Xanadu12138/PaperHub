<template>
    <!-- 个人分类界面 -->
    <section class="is-fullheight-with-navbar">
        <b-table
            :data="tableData"
            :striped="true">

            <b-table-column field="id" label="序号" width="100" centered numeric v-slot="props">
                {{ props.row.id }}
            </b-table-column>

            <b-table-column field="id" label="论文链接" centered numeric v-slot="props">
                <div>
                    <a href="https:www.baidu.com">{{ props.row.id }}</a>
                </div>
            </b-table-column>

            <b-table-column field="categoryName" label="标题" width="150" centered v-slot="props">
                {{ props.row.categoryName }}
            </b-table-column>

            <b-table-column field="enterCategories" label="作者" width="100" centered v-slot="props">
                {{ props.row.categoryName }}
            </b-table-column>

            <b-table-column label="描述" centered v-slot="props">
               {{ props.row.categoryName }} 
            </b-table-column>

            <b-table-column label="编辑" width="100" centered>
                <b-button size="is-small" type="is-warning" icon-right="refresh"></b-button>
            </b-table-column>

            <b-table-column label="删除" width="100" centered>
                  <b-button size="is-small" type="is-danger" icon-right="delete"></b-button>
            </b-table-column>

        </b-table>
        <div class="hero">
          <button class="button field is-primary" @click="selected = null">
              新增论文
          </button>
        </div>
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
            { 'categoryID': 3, 'categoryName': 'c3', 'userID': 1, 'isPublic': false},
            { 'categoryID': 4, 'categoryName': 'c4', 'userID': 1, 'isPublic': false},
            { 'categoryID': 5, 'categoryName': 'c5','userID': 1, 'isPublic': false}
      ]
    }
  },
  mounted () {
    for (let i = 0; i < this.categories.length; i++) {
      const row = {'id': i + 1,
             'categoryName': this.categories[i]['categoryName'],
             'categoryID': this.categories[i]['categoryID'],
             'isPublic': this.categories[i]['isPublic']}
      // console.log(row)
      this.tableData.push(row)
    }
  }
}
</script>

<style scoped>
</style>

