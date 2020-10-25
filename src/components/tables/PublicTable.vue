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

            <b-table-column field="enterCategory" label="进入分类" width="100" centered>
              <b-button size="is-small" type="is-info" icon-right="apps"></b-button>
            </b-table-column>

            <b-table-column label="查看评论" width="100" centered>
              <b-button size="is-small" type="is-warning" icon-right="refresh"
                        @click="goComent"></b-button>
            </b-table-column>
             
        </b-table>
        <!-- 评论区 -->
        <b-modal 
            v-model="isCommentModalActive"
            has-modal-card
            full-screen 
            :can-cancel="false">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">评论</p>
                </header>
                <section class="modal-card-body">
                    
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="isCommentModalActive=false">Close</button>
                </footer>
            </div>
        </b-modal>
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
      categories: [
            { 'categoryName': 'c1', 'userName': 'a'},
            { 'categoryName': 'c2', 'userName': 'b'},
            { 'categoryName': 'c3', 'userName': 'c'},
            { 'categoryName': 'c4', 'userName': 'd'},
            { 'categoryName': 'c5', 'userName': 'e'}
      ],
      isCommentModalActive: false
    }
  },
  methods: {
    queryComments(id) {
      this.isCommentModalActive = true
    },
    goComent (){
      this.$router.push('/Comments')
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

