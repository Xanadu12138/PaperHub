<template>
  <div>
    <b-tag type="is-large is-primary">Admin</b-tag>
    <button class="button" @click="backup">
      备份数据库
    </button>
    <b-dropdown :triggers="['hover']" aria-role="list">
        <button class="button" slot="trigger">
            <span>恢复数据库</span>
            <b-icon icon="menu-down"></b-icon>
        </button>
        <b-dropdown-item aria-role="listitem"
                        v-for="item in backupList"
                        :key="item.date"
                        @click="recover(item.backupID)">
                        {{item.date}}
        </b-dropdown-item>
    </b-dropdown>
    <button class="button" @click="logout">
      注 销
    </button>
  </div>
</template>

<script>

export default {
    name: 'BackupBtn',
    data() {
        return {
            backupList: [],
            backups: []
        }
    },
    methods: {
        backup() {
            this.$axios.post('/api/backupDB')
            .then(response => {
                alert('备份数据库成功')
                this.retrieveBackup()
            }).catch(err => {
                console.log(err)
                alert('备份数据库失败')
            })
        },
        retrieveBackup() {
            this.$axios.get('/api/retrieveBackup')
            .then(response => {
                this.backups = response.data.msg
                this.backupList = []
                // backups[i] = {backupID, date}
                for (let i = 0; i < this.backups.length; i++) {
                    // 视图中的数据
                    const row = {
                            'backupID': this.backups[i]['backupID'],
                            'date': this.backups[i]['date']}
                    this.backupList.push(row)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        recover(id) {
            const params = this.$qs.stringify({backupID: id}) 
            this.$axios.post('/api/recover', params)
            .then(response => {
                alert('恢复数据库成功')
                this.retrieveBackup()
                // 直接刷新页面
                setTimeout(() => window.location.reload(), 1000)
            }).catch(err => {
                console.log(err)
                alert('恢复数据库失败')
            })
        },
        logout() {
            this.$router.push('/')
            this.$store.commit('clearAdminInfo')
            document.cookie = ""
        }
    },
    mounted() {
       this.retrieveBackup()
    }
}
</script>

<style scoped>

</style>
